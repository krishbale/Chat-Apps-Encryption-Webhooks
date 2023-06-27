import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JWTAUTHGuard } from 'src/@guards/jwt.guards';
import { ProfileService } from './profile.service';
import { changepasswordDto } from './dto/changepassword.dto';
import { GetUser } from 'src/decorators/getuser.decorator';
import { User } from 'src/user/entity/user.entity';
import { ChatService } from 'src/chat/chat.service';
import { Chat } from 'src/chat/entity/chat.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { storagefile } from 'src/utils/storge/config';
@Controller('profile')
export class ProfileController {
  dataSource: any;
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
  @Post('uploadfile')
  @UseGuards(JWTAUTHGuard)
  @UseInterceptors(FileInterceptor('file', { storage: storagefile }))
  async uploadfile(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('upload avatar');
    console.log(file);
    // return await this.chatserice.uploadfile(user, file);
  }
}
