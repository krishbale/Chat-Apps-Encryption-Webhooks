import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { ChatModule } from 'src/chat/chat.module';
import { Chat } from 'src/chat/entity/chat.entity';
import { S3Module } from 'src/s3/s3.module';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Chat]),
    S3Module,
    ChatModule,
    GatewayModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
