import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ChatReply } from './chatreply.entity';
import { EncryptionTransformer } from 'typeorm-encrypted';
import { MyEncryptionTransformerConfig } from 'src/encryption/encryption.config';
import { MyEncryptionTransformer } from '../../encryption/custom-transfer';

@Entity({ name: 'chat' })
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: true,
    // transformer: new EncryptionTransformer(MyEncryptionTransformerConfig),
    transformer: new MyEncryptionTransformer(),
    // transformer: new EncryptionTransformer(MyEncryptionTransformerConfig),
  })
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

  //listeners
}
