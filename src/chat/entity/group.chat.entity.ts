import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'group-chat' })
export class GroupChat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  message: string;

  @Column('uuid', {})
  sender_id: string;

  @Column({})
  group_id: string;

  @CreateDateColumn()
  createdat: Date;
}
