import { UsePipes, ValidationPipe, UseFilters } from '@nestjs/common';
import fs from 'fs';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageDto } from './dto/Chat.message.dto';
import { WsExceptionFilter } from './ws-exception.filter';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JWTSECRET } from 'src/constant';
import { User } from 'src/user/entity/user.entity';
import { ChatService } from 'src/chat/chat.service';
import { HttpService } from '@nestjs/axios';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(new WsExceptionFilter())
export class MyGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private chatService: ChatService,
    private readonly httpService: HttpService,
  ) {}
  afterInit(server: Server) {
    console.log(server, 'Init');
  }
  async handleConnection(socket: Socket) {
    try {
      //get token from header or
      const token =
        (socket.handshake.headers.token as string) || ///postman
        socket.handshake.auth.token || //frontend
        socket.handshake.headers.authorization;

      if (!socket) return socket.disconnect(true);
      //verify token
      const jwtobject = this.jwtService.verify(token, {
        secret: JWTSECRET,
      });
      const user: User = await this.userService.getUserByID(jwtobject.sub);
      if (!user) {
        return socket.disconnect(true);
      } else {
        //connect to socket with userid
        socket.join(user.id);

        //set data to socket
        socket.data = { userId: user.id };

        //update online status to true
        await this.userService.updateUserStatus(user.id, true);
        socket.emit('user-connected'),
          {
            userId: socket.data.userId,
          };
        console.log(`Client with user  id: ${user.id.toString()} connected `);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async handleDisconnect(socket: Socket) {
    //afterdisconnecting
    socket.emit('user-disconnected', {
      userId: socket.data.userId,
    });
    //update online status to false
    socket.data.userId &&
      (await this.userService.updateUserStatus(socket.data.userId, false));
    console.log(
      `Client with connection id: ${socket.data.userId} disconnected`,
    );
  }
  //for group chat
  @SubscribeMessage('group-chat')
  @UsePipes(new ValidationPipe())
  async handleMessage(
    @MessageBody() message: any,
    @ConnectedSocket() Socket: Socket,
  ) {
    this.server.emit('room', {
      sender: Socket.data.userId,
      message: message.message,
      group_id: message.to,
    });
    await this.chatService.creategroupchat({
      message: message.message,
      sender_id: Socket.data.userId,
      group_id: message.to,
    });
  }

  //for private chat
  @SubscribeMessage('private-chat')
  @UsePipes(new ValidationPipe())
  async handlePrivateMessage(
    @MessageBody() message: any,
    @ConnectedSocket() socket: Socket,
  ) {
    await this.chatService.createchat({
      message: message.message,
      sender_id: socket.data.userId,
      receiver_id: message.to,
    });

    //storing message in database
    this.server.to(message.to).emit('personal', {
      sender: socket.data.userId,
      message: message.message,
      receiver: message.to,
    });
  }
  //for joinging room
  @SubscribeMessage('join-room')
  onJoin(@MessageBody() MessageDto: MessageDto) {
    ///joing room with room id as  to
    this.server.socketsJoin(MessageDto.to);
    {
      //
      console.log('new room joined ', MessageDto.to);
    }
  }

  //fo mentioning user
  @SubscribeMessage('mention')
  onMention(
    @MessageBody() Messagedto: MessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    //check if mention is not for same user
    if (Messagedto.to && Messagedto.to !== socket.data.userId) {
      this.server.to(Messagedto.to).emit('notify', {
        message: 'you are mentioned',
        time: new Date().toString(),
      });
    }
  }

  @SubscribeMessage('reply')
  async OnReply(@MessageBody() reply: any, @ConnectedSocket() socket: Socket) {
    //if reply is not for same user and message exist in database
    if (reply.to && reply.to !== socket.data.userId) {
      const parentmessage = await this.chatService.findchatbyid(reply.msgid);
      if (!parentmessage) {
        this.server.to(reply.from).emit('notify', {
          message: 'message not found',
        });
      }
      //emmmiting reply to user
      this.server.to(reply.to).emit('notify', {
        msgid: reply.msgid,
        reply: reply.reply,
        from: socket.data.userId,
      });

      //storing reply in database
      await this.chatService.createreply({
        reply: reply.reply,
        msgid: reply.msgid,
        from: socket.data.userId,
        to: reply.to,
      });
    }
  }
  // uploadin file in socket using emit method
  @SubscribeMessage('upload')
  handleUpload(@MessageBody() file: any) {
    this.server.emit('file', file);
    console.log(file);
  }

  // for chatbot
  @SubscribeMessage('chatbot')
  async handleChatbot(
    @MessageBody() message: any,
    @ConnectedSocket() socket: Socket,
  ) {
    const response = await this.httpService.axiosRef.post(
      'https://sore-teal-dibbler-fez.cyclic.app/chatbot',
      {
        message,
      },
    );
    // console.log(response);
    // this.server.emit('azurebot', response);

    //   await this.webhookservice.handleChatbot(message);
  }
}
