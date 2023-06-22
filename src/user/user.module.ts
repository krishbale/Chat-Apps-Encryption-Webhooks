import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { OtpModule } from 'src/otp/otp.module';
import { OtpService } from 'src/otp/otp.service';



@Module({
  imports: [TypeOrmModule.forFeature([User]),OtpModule],
  
  controllers: [UserController],
  providers: [UserService,OtpService],
 
  exports: [UserService]
})
export class UserModule {}
