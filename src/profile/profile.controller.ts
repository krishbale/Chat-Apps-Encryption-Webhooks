import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { storagefile } from 'src/utils/storge/config';
import { MyGateway } from 'src/gateway/gateway';
@Controller('profile')
export class ProfileController {
  constructor(
    private profileservice: ProfileService,
    private chatserice: ChatService,
    private mygateway: MyGateway,
  ) {}

  @UseGuards(JWTAUTHGuard)
  @Get('')
  profile(@GetUser() user: User) {
    return this.profileservice.profile(user);
  }

  @Get('/encrypt')
  async encrypt() {
    return this.chatserice.encrypt();
  }

  @Get('/hello')
  async hello() {
    return this.chatserice.hello();
  }
  @Get('/decrypt')
  async decrypt() {
    return this.chatserice.decrypt();
  }

  @Get('/getkeys')
  async getkeys() {
    return this.profileservice.getkeys();
  }
  @Post('/sendmessagewithrsa')
  async sendmessagewithrsa(@Body() body: any) {
    return this.profileservice.sendmessagewithrsa(body);
  }

  @Post('/changepassword')
  @UseGuards(JWTAUTHGuard)
  changepassword(
    @GetUser() User: User,
    @Body() changepassworddth: changepasswordDto,
  ) {
    return this.profileservice.changepassword(User, changepassworddth);
  }

  @UseGuards(JWTAUTHGuard)
  @Get('/chat/:id')
  async getchat(@Param('id', new ParseUUIDPipe()) id: any) {
    // console.log(id);
    return this.chatserice.findchatbyid(id);
  }

  @UseGuards(JWTAUTHGuard)
  @Post('/:id/uploadfile')
  @UseInterceptors(FileInterceptor('file', { storage: storagefile }))
  async uploadfile(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.chatserice.createchat({
      sender_id: user.id,
      file: `/uploads/${Date.now()}${file.originalname}`,
      receiver_id: id,
    });
    this.mygateway.server.to(id).emit('file', {
      sender: user.id,
      file: `/uploads/${Date.now()}${file.originalname}`,
      receiver: id,
    });

    return {
      success: true,
      emmitted: true,
      message: 'File upload successfull ',
      fileurl: `/uploads/${Date.now()}${file.originalname}`,
    };
  }
}
