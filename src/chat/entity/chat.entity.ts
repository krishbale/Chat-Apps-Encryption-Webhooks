import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { MyEncryptionTransformerConfig } from 'src/encryption/encryption.config';
import { MyEncryptionTransformer } from '../../encryption/custom-transfer';
import { User } from 'src/user/entity/user.entity';
@Tree('closure-table')
@Entity({ name: 'chat' })
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: true,
    transformer: new MyEncryptionTransformer(MyEncryptionTransformerConfig),
  })
  message: string;

  @Column({ nullable: true })
  file?: string;

  @ManyToOne(() => User, (user) => user.senderchat, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => User, (user) => user.receiverchat, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @Column('uuid', {})
  sender_id: string;

  @Column('uuid', {})
  receiver_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @TreeChildren()
  repliedchat: Chat[];

  @TreeParent()
  chatparent: Chat;
}
