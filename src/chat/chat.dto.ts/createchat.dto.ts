import { Column } from 'typeorm';

export class creatchatDTO {
  @Column({})
  message: string;

  @Column('uuid', {})
  sender_id: string;

  @Column('uuid', {})
  receiver_id: string;
}
