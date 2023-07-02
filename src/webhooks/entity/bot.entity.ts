import { User } from 'src/user/entity/user.entity';
import { OTP } from '../../otp/enitity/otp.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'chatbot' })
export class ChatBot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true, length: 50 })
  message: string;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @ManyToOne(() => User, (user) => user.chatbot)
  users: User[];
}
