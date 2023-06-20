import { Body, Injectable, Param } from '@nestjs/common';
import { UpdateUserDto } from './dto/updateuser.dto';

@Injectable()
export class UserService {
  UpdateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param() param: { userID: number },
  ) {
    return { body: updateUserDto, param };
  }
}
