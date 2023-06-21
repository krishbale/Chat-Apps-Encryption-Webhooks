import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant/auth.constant';

@Module({
    
  providers: [AuthService],
  controllers:[AuthController],
  imports:[UserModule,JwtModule.register({
    secret:jwtConstants.secret,
    signOptions:{ expiresIn:'60s'}
  }) ]
})
export class AuthModule {}
