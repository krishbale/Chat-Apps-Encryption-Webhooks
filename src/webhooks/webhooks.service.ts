import { Body, Injectable } from '@nestjs/common';
import { MyGateway } from '../gateway/gateway';
@Injectable()
export class WebHookService {
  constructor(private mygateway: MyGateway) {}
  handleWebhook(@Body() body: any) {
    this.mygateway.server.emit('azurebot', body);
    ///commenitng out the return body
    return body;
  }
  handleChatbot(@Body() body: any) {
    console.log(body);
  }
}
