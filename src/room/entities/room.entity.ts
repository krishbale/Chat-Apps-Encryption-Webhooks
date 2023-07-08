import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
