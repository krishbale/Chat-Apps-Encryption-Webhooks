import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JWTSECRET } from 'src/constant';

@Module({
    
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers:[AuthController],
  imports:[UserModule,JwtModule.register({
    secret:JWTSECRET,
    signOptions:{ expiresIn:'60s'}
  }) ]
})
export class AuthModule {}
