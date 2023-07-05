import { Body, Injectable, Post, Req, UploadedFile } from '@nestjs/common';
import { Chat } from './entity/chat.entity';
import { DataSource, getRepository } from 'typeorm';
import { GroupChat } from './entity/group.chat.entity';
import { ChatReply } from './entity/chatreply.entity';
import { MyEncryptionTransformer } from 'src/encryption/custom-transfer';
import { MyEncryptionTransformerConfig } from 'src/encryption/encryption.config';

@Injectable()
export class ChatService {
  constructor(private readonly dataSource: DataSource) {}
  async createchat(@Body() message: any) {
    const chat = new Chat();
    chat.message = message.message;
    chat.sender_id = message.sender_id;
    chat.receiver_id = message.receiver_id;
    chat.file = message.file;
    return await this.dataSource.getRepository(Chat).save(chat);
  }
  async creategroupchat(@Body() message: any) {
    return await this.dataSource.getRepository(GroupChat).save({
      message: message.message,
      sender_id: message.sender_id,
      group_id: message.group_id,
    });
  }
  async findchatbyid(id: string) {
    return await this.dataSource
      .getRepository(Chat)
      .findOne({ where: { id: id } });
  }
  async createreply(@Body() reply: any) {
    return await this.dataSource.getRepository(ChatReply).save({
      to: reply.to,
      reply: reply.reply,
      msgid: reply.msgid,
      from: reply.from,
    });
  }

  async encrypt() {
    const encryptionTransformer = new MyEncryptionTransformer(
      MyEncryptionTransformerConfig,
    );
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const chats = await queryRunner.manager.getRepository(Chat).find({});
      for (const chat of chats) {
        const newEncryptedMessage = encryptionTransformer.to(chat.message);
        chat.message = newEncryptedMessage;
        console.log(chats);
        await this.dataSource.getRepository(Chat).save(chat);
      }
    } catch (err) {
      console.log(err);
    }

    return 'chat  encrypted successfully.';
  }
  async decrypt() {
    const encryptionTransformer = new MyEncryptionTransformer(
      MyEncryptionTransformerConfig,
    );
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const chats = await queryRunner.manager.getRepository(Chat).find({});
      for (const chat of chats) {
        const newEncryptedMessage = encryptionTransformer.from(chat.message);
        chat.message = newEncryptedMessage;
        await this.dataSource.getRepository(Chat).save(chat);
      }
    } catch (err) {
      console.log(err);
    }

    return 'chat  decrypted  successfully.';
  }
}
