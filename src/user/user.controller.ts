import { Body, Controller, Get, Post, Param, Patch, ParseUUIDPipe, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { resetpasswordto, verifydto } from 'src/otp/dto/veifyotp.dto';
import { validatedto } from 'src/otp/dto/veifyotp.dto';
import { loginuserDto } from './dto/login.dto';
@Controller('/user')
export class UserController {

  constructor(private userService: UserService,
  ) { }




  //create user
 
  @Post('/register')
  create(@Body() loginuserDto: loginuserDto) {
    return this.userService.create(loginuserDto);
  }
  //login user
  @Post('/login')
  login(@Body() loginuserDto: loginuserDto) {
    return this.userService.login(loginuserDto);
  }

  //update user
  @Patch('/update/:userID')
  update(
    @Body() updateUserDto: loginuserDto,
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
  //forget password by email
  @Post('/forgetpassword')
  forgetpassword(@Body() verifydto: verifydto) {
    return this.userService.forgetpassword(verifydto)
  }

  //reset password by email and otp code from email
  @Post('/resetpassword')
  resetpassword(@Body() resetpasswordto: resetpasswordto) {
    return this.userService.resetpassword(resetpasswordto)
  }


}
