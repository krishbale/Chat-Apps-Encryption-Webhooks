import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JWTAUTHGuard } from 'src/@guards/jwt.guards';
import { ProfileService } from './profile.service';
import { changepasswordDto } from './dto/changepassword.dto';
import { GetUser } from 'src/decorators/getuser.decorator';
import { User } from 'src/user/entity/user.entity';
import { ChatService } from 'src/chat/chat.service';
@Controller('profile')
export class ProfileController {
  constructor(
    private profileservice: ProfileService,
    private chatserice: ChatService,
  ) {}

  @UseGuards(JWTAUTHGuard)
  @Get('')
  profile(@GetUser() user: User) {
    return this.profileservice.profile(user);
  }
  @Post('changepassword')
  @UseGuards(JWTAUTHGuard)
  changepassword(
    @GetUser() User: User,
    @Body() changepassworddth: changepasswordDto,
  ) {
    return this.profileservice.changepassword(User, changepassworddth);
  }
}
