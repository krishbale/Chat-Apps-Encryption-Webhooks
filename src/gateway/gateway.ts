import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
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
import { creatchatDTO } from 'src/chat/chat.dto.ts/createchat.dto';
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
  ) {}
  afterInit(server: Server) {
    console.log(server, 'Init');
  }
  async handleConnection(socket: Socket) {
    try {
      const token =
        (socket.handshake.headers.token as string) ||
        socket.handshake.auth.token ||
        socket.handshake.headers.authorization;

      if (!socket) return socket.disconnect(true);
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
      group_id: message.group_id,
    });
    await this.chatService.creategroupchat({
      message: message.message,
      sender_id: Socket.data.userId,
      group_id: message.group_id,
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
    this.server.socketsJoin(MessageDto.to);
    {
      console.log('new room joined ', MessageDto.to);
    }
  }

  //fo mentioning user
  @SubscribeMessage('mention')
  onMention(
    @MessageBody() Messagedto: MessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    if (Messagedto.to && Messagedto.to !== socket.data.userId) {
      this.server.to(Messagedto.to).emit('notify', {
        message: 'you are mentioned',
        time: new Date().toString(),
      });
    }
  }

  @SubscribeMessage('reply')
  async OnReply(@MessageBody() reply: any, @ConnectedSocket() socket: Socket) {
    if (reply.to && reply.to !== socket.data.userId) {
      const parentmessage = await this.chatService.findchatbyid(reply.msgid);
      if (!parentmessage) {
        this.server.to(reply.from).emit('notify', {
          message: 'message not found',
        });
      }
      this.server.to(reply.to).emit('notify', {
        msgid: reply.msgid,
        reply: reply.reply,
        from: socket.data.userId,
      });
      await this.chatService.createreply({
        reply: reply.reply,
        msgid: reply.msgid,
        from: socket.data.userId,
        to: reply.to,
      });
    }
  }
}
