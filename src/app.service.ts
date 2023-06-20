import { Injectable, Param, Req } from '@nestjs/common';

@Injectable()
export class AppService {
  getUser(): any {
    return { name: 'Balkrishna', email: 'balkrishnapokharel70@gmail.com' };
  }
  create(@Req() req: Request) {
    return req.body;
  }
  updateuser(@Req() req: Request, @Param() param: { userID: number }) {
    return { body: req.body, param };
  }
}
