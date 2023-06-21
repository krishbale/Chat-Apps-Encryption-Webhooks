import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  controllers:[AuthController],
  imports:[UserModule ]
})
export class AuthModule {}
