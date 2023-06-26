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
  ) {}
  afterInit(server: Server) {
    console.log(server, 'Init');
  }
  async handleConnection(socket: Socket) {
    try {
      //after passing access token in header
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
        socket.emit('connected', {
          message: 'connected',
          time: new Date().toString(),
        });
        //connect to socket with userid
        socket.join(user.id);
        //set data to socket
        socket.data = { userId: user.id };
        //update online status to true
        await this.userService.updateUserStatus(user.id, true);
        console.log(`Client with user  id: ${user.id.toString()} connected `);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async handleDisconnect(socket: Socket) {
    //afterdisconnecting
    socket.broadcast.emit('user disconnected');
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
  handleMessage(@MessageBody() message: MessageDto) {
    this.server.emit('room', {
      message,
      time: new Date().toString(),
    });
  }

  //for private chat
  @SubscribeMessage('private-chat')
  @UsePipes(new ValidationPipe())
  handlePrivateMessage(
    @MessageBody() message: MessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    //storing message in database
    this.server.to(message.to).emit('personal', {
      sender: socket.data.userId,
      message,

      time: new Date().toString(),
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
}
