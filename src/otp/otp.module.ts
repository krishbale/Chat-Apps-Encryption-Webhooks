import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
@Module({})
export class OtpModule {
  providers: [OtpService];
  exports: [OtpService];
}
