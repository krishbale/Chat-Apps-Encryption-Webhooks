import { Body, Injectable } from '@nestjs/common';
@Injectable()
export class WebHookService {
  handleWebhook(@Body() body: any) {
    console.log(body);
    return body;
  }
}
