import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateuser.dto';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUser() {
    return 'I am from usercontroller';
  }
  @Patch('/:userID')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param() param: { userID: number },
  ) {
    return this.userService.UpdateUser(updateUserDto, param);
  }
}
