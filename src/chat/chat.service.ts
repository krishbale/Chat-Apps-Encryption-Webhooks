import { Body, Injectable, Post, Req, UploadedFile } from '@nestjs/common';
import { Chat } from './entity/chat.entity';
import { DataSource } from 'typeorm';
import { GroupChat } from './entity/group.chat.entity';
import { ChatReply } from './entity/chatreply.entity';

@Injectable()
export class ChatService {
  constructor(private readonly dataSource: DataSource) {}
  async createchat(@Body() message: any) {
    const chat = new Chat();
    chat.message = message.message;
    chat.sender_id = message.sender_id;
    chat.receiver_id = message.receiver_id;
    chat.file = message.file;
    console.log(chat);
    return await this.dataSource.getRepository(Chat).save(chat);
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

  async updateoldchatmessage(@Body() message: any) {
    const chatRepository = this.dataSource.getRepository(Chat);
    //find message by 
    const chat = await chatRepository.findOne(message.id);
    if (chat) {
      chat.message = message.message;
      return await chatRepository.save(chat);
    } else {
      throw new Error('Chat not found');
    }

  // async savefile(id: string, file: Express.Multer.File) {
  //   const chatRepository = this.dataSource.getRepository(Chat);

  //   const chat = await chatRepository.findOne(id);

  //   if (chat) {
  //     chat.file = file;
  //     return await chatRepository.save(chat);
  //   } else {
  //     throw new Error('Chat not found');
  //   }
  // }
}
