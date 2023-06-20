import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUser(): any {
    return this.appService.getUser();
  }
  @Post()
  PostUser(@Req() req: Request) {
    return this.appService.create(req);
  }
  @Patch('/:userID')
  UpdateUser(@Req() req: Request, @Param() param: { userID: number }) {
    return this.appService.updateuser(req, param);
  }
}
