import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { ormConfig } from './orm-config';
import { OtpService } from './otp/otp.service';
import { OtpModule } from './otp/otp.module';
import { GatewayModule } from './gateway/gateway.module';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WebHookModule } from './webhooks/webhook.module';
import { RoomModule } from './room/room.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: () => ormConfig }),
    UserModule,
    ProfileModule,
    OtpModule,
    GatewayModule,
    ChatModule,
    WebHookModule,
    RoomModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      exclude: ['/api/(.*)'],
    }),

    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService, OtpService, ChatService],
})
export class AppModule {}
