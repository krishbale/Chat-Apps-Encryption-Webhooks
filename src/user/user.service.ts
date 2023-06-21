import {  Injectable,   } from '@nestjs/common';
import { UpdateUserDto, } from './dto/updateuser.dto';
import { Repository } from 'typeorm';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/createuser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }
//getting total user from the database
  findall(): Promise<User[]> {
    return this.userRepository.find();
  }

  //creating new user database
  create(creatuserdto: CreateUserDto) {
    
    return this.userRepository.save(creatuserdto);
  }
///updating existing database
  UpdateUser(
    updateUserDto: UpdateUserDto,
    userID: string,
  ) {
    return this.userRepository.update(userID, updateUserDto);
  }

  //getting userdatabase by id
  getUserByID(
    userID: string
  ) {
    return this.userRepository.findOne({ where: { id: userID } });
  }

  //deleting user database by id
  deleteUser(
    userID: string
  ) {
    return this.userRepository.delete(userID)
  }

  //finding database by email
  findbyEmail(
    email:string
  ){
    return this.userRepository.findOne({where:{email}});
  }
}
