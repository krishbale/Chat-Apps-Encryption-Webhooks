import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { BeforeInsert } from 'typeorm';
@Entity({name:'users'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("varchar", { length: 50 })
  name: string;

  @Column("varchar", {unique:true, length: 50 })
  email: string;

  @Column( 'varchar',{ length:128})
  password:string;

  @CreateDateColumn()
  createdat:Date;

  @UpdateDateColumn()
  updatedat:Date;

  @BeforeInsert()
  async hashPassword(){
    const salt = await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
  } 
}
