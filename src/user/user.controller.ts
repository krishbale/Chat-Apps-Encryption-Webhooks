import { Body, Controller, Get, Post, Param, Patch, ParseUUIDPipe, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateuser.dto';
import { CreateUserDto } from './dto/createuser.dto';

@Controller('/user')
export class UserController {

  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findall();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
   
    return this.userService.create(createUserDto);
  }

  @Patch('/:userID')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userID',ParseUUIDPipe) userID: string ,
  ) {
    return this.userService.UpdateUser(updateUserDto,userID);
  }


  @Get('/:userID')
  show(
    @Param('userID',ParseUUIDPipe) userID:string,
  ){
    return this.userService.getUserByID(userID);
  }


  @Delete('/:userID')
  delete(
  @Param('userID',ParseUUIDPipe) userID:string,
  ){
    return this.userService.deleteUser(userID);
  }

 
}
