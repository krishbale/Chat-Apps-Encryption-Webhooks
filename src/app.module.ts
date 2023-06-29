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
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: () => ormConfig }),
    UserModule,
    ProfileModule,
    OtpModule,
    GatewayModule,
    ChatModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService, OtpService, ChatService],
})
export class AppModule {}
