import {

  Module,

} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ormConfig } from './orm-config';
import { OtpService } from './otp/otp.service';
import { OtpModule } from './otp/otp.module';

@Module({
  imports:
    [TypeOrmModule.forRootAsync({ useFactory: () => ormConfig }),
      UserModule,
      AuthModule,
      ProfileModule,
      OtpModule,
    ],
  controllers: [AppController],
  providers: [AppService, OtpService,],
})
export class AppModule { }
