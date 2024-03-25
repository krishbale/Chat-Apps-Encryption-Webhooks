import { UsePipes, ValidationPipe, UseFilters } from '@nestjs/common';
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
import { DataSource } from 'typeorm';
import { Chat } from 'src/chat/entity/chat.entity';
import { Room } from 'src/room/entities/room.entity';
import { WebHookService } from 'src/webhooks/webhooks.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(new WsExceptionFilter())
export class MyGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private protobuffer: any;

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly dataSource: DataSource,
    private userService: UserService,
    private jwtService: JwtService,
    private chatService: ChatService,
    private readonly httpService: HttpService,
  ) {}
  afterInit(server: Server) {
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
            userid: user.id.toString(),
          };
        // console.log(`Client with user  id: ${user.id.toString()} connected `);
      }
    } catch (e) {
      // console.log(e);
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

  //for private chat and reply
  @SubscribeMessage('lets-chat')
  @UsePipes(new ValidationPipe())
  async handlePrivateMessage(
    @MessageBody() message: any,
    @ConnectedSocket() socket: Socket,
  ) {
    //for chat only if msgid is not present
    if (!message.msgid) {
      const chat = new Chat();
      chat.message = message.message;
      chat.sender_id = socket.data.userId;
      chat.receiver_id = message.to;
      const response = await this.dataSource.getRepository(Chat).save(chat);

      const jsonData = JSON.stringify(response);
      const base64Data = Buffer.from(jsonData).toString('base64');

      const payload = this.protobuffer.create(response);
      const buffer = this.protobuffer.encode(payload).finish();
      const encode = this.protobuffer.decode(buffer);
      // console.log(buffer);
      // console.log(encode);
      this.server.to(message.to).emit('gets-chat', {
        sender: response.sender_id,
        message: response.message,
        receiver: response.receiver_id,
        msgid: response.id,
        buffer: buffer,
      });
    } else {
      //for reply if msgid is present
      const chat = await this.chatService.findchatbyid(message.msgid);
      const response = await this.chatService.createchat({
        message: message.message,
        sender_id: socket.data.userId,
        receiver_id: message.to,
        chatparent: chat,
      });
      this.server.to(message.to).emit('gets-chat', {
        sender: socket.data.userId,
        message: message.message,
        receiver: message.to,
        msgid: response.id,
      });
    }
  }

  //for joinging room
  @SubscribeMessage('join-room')
  onJoin(@MessageBody() MessageDto: MessageDto) {
    this.server.socketsJoin(MessageDto.to);
    {
      // console.log('new room joined ', MessageDto.to);

      this.server.to(MessageDto.to).emit('notify', {
        message: 'new user joined',
        time: new Date().toString(),
      });
    }
  }

  @SubscribeMessage('create-room')
  async onCreateRoom(
    @MessageBody() message: any,
    @ConnectedSocket() socket: Socket,
  ) {
    const room = await this.dataSource.getRepository(Room).save(message);
    this.server.to(socket.data.userId).emit('notify', {
      message: 'new room created',
      room: room,
      time: new Date().toString(),
    });
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
    this.server.emit('azurebot', response);

    // await this.webhookService.handleChatbot(message);
  }
}
