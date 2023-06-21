import { Body, Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { UpdateUserDto,} from './dto/updateuser.dto';
import { Repository } from 'typeorm';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/createuser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findall(): Promise<User[]> {
    return this.userRepository.find();
  }
  create( creatuserdto: CreateUserDto) {
    return this.userRepository.save(creatuserdto);
  }

  UpdateUser(
    updateUserDto: UpdateUserDto,
   userID: string ,
  ) {
    return { body:updateUserDto,userID}
  }
  getUserByID(
    userID:string
  ){
    return this.userRepository.findOne({where: {id:userID}});
  }
  deleteUser(
    userID:string
  ){
    return this.userRepository.delete(userID)
  }
}
