import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { OtpModule } from 'src/otp/otp.module';
import { OtpService } from 'src/otp/otp.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTSECRET } from 'src/constant';
// import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    OtpModule,
    JwtModule.register({
      secret: JWTSECRET,
      signOptions: { expiresIn: '365d' },
    }),
  ],

  controllers: [UserController],
  providers: [UserService, OtpService],
  exports: [UserService],
})
export class UserModule {}
