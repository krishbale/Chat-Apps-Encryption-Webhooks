import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JWTSECRET } from 'src/constant';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    JwtModule.register({
      secret: JWTSECRET,
      signOptions: { expiresIn: '300000min' },
    }),
    UserModule,
    ChatModule,
  ],
  providers: [MyGateway],
  controllers: [],
  exports: [MyGateway],
})
export class GatewayModule {}
