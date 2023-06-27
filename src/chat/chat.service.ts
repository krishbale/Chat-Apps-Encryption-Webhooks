import { Body, Injectable } from '@nestjs/common';
import { Chat } from './entity/chat.entity';
import { DataSource } from 'typeorm';
import { GroupChat } from './entity/group.chat.entity';
import { ChatReply } from './entity/chatreply.entity';

@Injectable()
export class ChatService {
  constructor(private readonly dataSource: DataSource) {}
  async createchat(@Body() message: any) {
    return await this.dataSource.getRepository(Chat).save({
      message: message.message,
      sender_id: message.sender_id,
      receiver_id: message.receiver_id,
    });
  }
  async creategroupchat(@Body() message: any) {
    return await this.dataSource.getRepository(GroupChat).save({
      message: message.message,
      sender_id: message.sender_id,
      group_id: message.group_id,
    });
  }
  async findchatbyid(@Body() messageid: any) {
    return await this.dataSource
      .getRepository(Chat)
      .findOne({ where: { id: messageid.id } });
  }
  async createreply(@Body() reply: any) {
    return await this.dataSource.getRepository(ChatReply).save({
      to: reply.to,
      reply: reply.reply,
      msgid: reply.msgid,
      from: reply.from,
    });
  }
}
