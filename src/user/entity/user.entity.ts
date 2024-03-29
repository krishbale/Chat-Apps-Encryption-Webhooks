import { Chat } from 'src/chat/entity/chat.entity';
import { OTP } from '../../otp/enitity/otp.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true, length: 50 })
  email: string;

  @Column('varchar', { length: 128 })
  password: string;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @Column('boolean', { default: false })
  isverified: boolean;

  @OneToMany(() => OTP, (otp) => otp.user)
  otps: OTP[];

  @OneToMany(() => Chat, (chat) => chat.sender)
  senderchat: Chat[];

  @OneToMany(() => Chat, (chat) => chat.receiver)
  receiverchat: Chat[];

  @Column('boolean', { default: false })
  isOnline: boolean;
}
