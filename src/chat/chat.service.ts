import { Body, Injectable, Post, Req, UploadedFile } from '@nestjs/common';
import { Chat } from './entity/chat.entity';
import { MyEncryptionTransformer } from 'src/encryption/custom-transfer';
import { MyEncryptionTransformerConfig } from 'src/encryption/encryption.config';
import { DataSource } from 'typeorm';

@Injectable()
export class ChatService {
  private Message: any;
  private MessageList: any;

  constructor(private readonly dataSource: DataSource) {}
  async createchat(@Body() message: any) {
    const chat = new Chat();
    chat.message = message.message;
    chat.sender_id = message.sender_id;
    chat.receiver_id = message.receiver_id;
    chat.file = message.file;
    chat.chatparent = message.chatparent;
    return await this.dataSource.getRepository(Chat).save(chat);
  }
  // async creategroupchat(@Body() message: any) {
  //   return await this.dataSource.getRepository(GroupChat).save({
  //     message: message.message,
  //     sender_id: message.sender_id,
  //     group_id: message.group_id,
  //   });
  // }
  async findchatbyid(id: string) {
    return await this.dataSource
      .getRepository(Chat)
      .findOne({ where: { id: id } });
  }
  // async createreply(@Body() reply: any) {
  //   return await this.dataSource.getRepository(ChatReply).save({
  //     to: reply.to,
  //     reply: reply.reply,
  //     msgid: reply.msgid,
  //     from: reply.from,
  //   });
  // }

  async encrypt() {
    const encryptionTransformer = new MyEncryptionTransformer(
      MyEncryptionTransformerConfig,
    );
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const chats = await queryRunner.manager.getRepository(Chat).find({});
      let li = 0;
      for (const chat of chats) {
        const newEncryptedMessage = encryptionTransformer.to(chat.message);
        chat.message = newEncryptedMessage;
        await queryRunner.manager.getRepository(Chat).save(chat);
        console.log`Encrypitn meeage:${li++}`;
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      queryRunner.rollbackTransaction();
      console.log(err);
    } finally {
      await queryRunner.release();
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
      let li = 0;
      const chats = await queryRunner.manager.getRepository(Chat).find({});
      for (const chat of chats) {
        const newEncryptedMessage = encryptionTransformer.from(chat.message);
        chat.message = newEncryptedMessage;
        await queryRunner.manager.getRepository(Chat).save(chat);
        console.log`Decrypitn meeage:${li++}`;
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      queryRunner.rollbackTransaction();
      console.log(err);
    } finally {
      await queryRunner.release();
    }

    return 'chat  decrypted  successfully.';
  }

  async hello() {
    const jsonData = await this.dataSource.query('SELECT * FROM chat');
    const messageList = this.MessageList.create({
      messages: jsonData.map((data) => this.Message.create(data)),
    });
    const buffer = this.MessageList.encode(messageList).finish();

    const decodedMessageList = this.MessageList.decode(buffer);
    const decodedData = this.MessageList.toObject(decodedMessageList, {
      longs: String, // Convert longs to string format
      enums: String, // Convert enums to string names
      defaults: true, // Include default values
      arrays: true, // Convert repeated fields to arrays
      objects: true,
    });
    return decodedData;
  }
}
