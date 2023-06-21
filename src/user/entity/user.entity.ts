import * as bcrypt from 'bcrypt';
import { BeforeUpdate, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';



@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("varchar", { length: 50 })
  name: string;

  @Column("varchar", { unique: true, length: 50 })
  email: string;

  @Column('varchar', { length: 128 })
  password: string;
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    if(this.password)  this.password = await bcrypt.hash(this.password, salt);
  }


  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;
}
