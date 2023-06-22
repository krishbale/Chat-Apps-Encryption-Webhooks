import { Body, Controller, Get, Post, Param, Patch, ParseUUIDPipe, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateuser.dto';
import { CreateUserDto } from './dto/createuser.dto';
import { verifydto } from 'src/otp/dto/requestverification.dto';
@Controller('/user')
export class UserController {

  constructor(private userService: UserService,
    ) {}
  

  @Get('/byname')
  getbyname(){
    return this.userService.findname();
  }

  @Get('/byorder')
  getbyorder(){
    return this.userService.sortbyorder();
  }
 
  


  @Get()
  findAll() {
    return this.userService.findall();
  }

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
   
    return this.userService.create(createUserDto);
  }
  @Post('/verify')
  verifyotp(@Body() verifydto:verifydto  ){
    return this.userService.requestotpverify(verifydto)
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
