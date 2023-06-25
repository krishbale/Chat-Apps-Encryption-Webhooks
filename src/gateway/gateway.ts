import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatMessage } from './dto/Chat.message.dto';
import { WsExceptionFilter } from './ws-exception.filter';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JWTSECRET } from 'src/constant';

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
      const token = socket.handshake.headers.token as string;
      if (!token) return socket.disconnect(true);
      const jwtobject = this.jwtService.verify(token, {
        secret: JWTSECRET,
      });
      console.log(jwtobject.sub);

      const user = await this.userService.getUserByID(jwtobject.sub);
      // console.log(user)

      if (!user) {
        return socket.disconnect(true);
      } else {
        socket.data = { userid: user.id };
        socket.emit('connected', {
          message: 'connected',
          time: new Date().toString(),
        });
        socket.join(user.id);

        await this.userService.updateUserStatus(user.id, true);
        console.log(`Client with user  id: ${user.id.toString()} connected `);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async handleDisconnect(socket: Socket) {
    socket.broadcast.emit('user disconnected');

    console.log(`Client with connection id: ${socket.id} disconnected`);
  }

  //for group chat

  @SubscribeMessage('group-chat')
  @UsePipes(new ValidationPipe())
  handleMessage(@MessageBody() message: ChatMessage) {
    this.server.emit('room', {
      message,
      time: new Date().toString(),
    });
  }

  //for private chat using id
  @SubscribeMessage('private-chat')
  @UsePipes(new ValidationPipe())
  handlePrivateMessage(@MessageBody() message: ChatMessage) {
    this.server.to(message.to).emit('personal', {
      to: message.to,
      message,
      time: new Date().toString(),
    });
  }
}
