import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat.entity';

@Entity({ name: 'chatreply' })
export class ChatReply {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  to: string;

  @Column({})
  from: string;

  @Column({})
  reply: string;

  @CreateDateColumn()
  createdat: Date;

  @Column('uuid')
  msgid: string;

  @ManyToOne(() => Chat, (chat) => chat.chatreply, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'msgid' })
  chat: Chat;
}
