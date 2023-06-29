import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatReply } from './chatreply.entity';

@Entity({ name: 'chat' })
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  message: string;

  @Column({ nullable: true })
  file?: string;

  @Column('uuid', {})
  sender_id: string;

  @Column('uuid', {})
  receiver_id: string;

  @CreateDateColumn()
  createdat: Date;

  @OneToMany(() => ChatReply, (chatreply) => chatreply.chat)
  chatreply: Chat[];
}
