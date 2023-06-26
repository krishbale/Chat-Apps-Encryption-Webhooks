import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'chat' })
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  message: string;

  @Column('uuid', {})
  sender_id: string;

  @Column('uuid', {})
  receiver_id: string;

  @CreateDateColumn()
  createdat: Date;
}
