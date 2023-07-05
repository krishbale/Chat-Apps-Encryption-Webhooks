import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JWTSECRET } from 'src/constant';
import { ChatModule } from 'src/chat/chat.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    JwtModule.register({
      secret: JWTSECRET,
      signOptions: { expiresIn: '365d' },
    }),
    UserModule,
    ChatModule,
    HttpModule,
  ],
  providers: [MyGateway],
  controllers: [],
  exports: [MyGateway],
})
export class GatewayModule {}
