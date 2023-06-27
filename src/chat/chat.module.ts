import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { Chat } from './entity/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],

  controllers: [],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
