import { Body, Controller, Get, Post, Param, Patch, ParseUUIDPipe, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateuser.dto';
import { CreateUserDto } from './dto/createuser.dto';
import { verifydto } from 'src/otp/dto/veifyotp.dto';
import { validatedto } from 'src/otp/dto/veifyotp.dto';
@Controller('/user')
export class UserController {

  constructor(private userService: UserService,
  ) { }


 
 
//create user
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {

    return this.userService.create(createUserDto);
  }
  //update user
  @Patch('/update/:userID')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userID', ParseUUIDPipe) userID: string,
  ) {
    return this.userService.UpdateUser(updateUserDto, userID);
  }

 

//get user by id
  @Get('/:userID')
  show(
    @Param('userID', ParseUUIDPipe) userID: string,
  ) {
    return this.userService.getUserByID(userID);
  }

//delete user by id
  @Delete('/:userID')
  delete(
    @Param('userID', ParseUUIDPipe) userID: string,
  ) {
    return this.userService.deleteUser(userID);
  }
//request otp by email
  @Post('/requestotp')
  requestotp(@Body() verifydto: verifydto) {
    return this.userService.requestotp(verifydto)
  }
//validate otp by email and otp code from email
  @Post('/validateotp')
  validateotp(@Body() validatedto: validatedto) {
    return this.userService.validateotp(validatedto)
  }


}
