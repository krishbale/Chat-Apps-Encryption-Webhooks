import { Body, Controller, Post } from '@nestjs/common';
import { WebHookService } from './webhooks.service';

@Controller()
export class WebHookController {
  dataSource: any;
  constructor(private readonly webhookservice: WebHookService) {}

  @Post('webhook')
  async handleWebhook(@Body() body: any) {
    // console.log(body);
    // await this.dataSource.getRepository(ChatBot).save({
    //   message: body.message,
    // });
    return this.webhookservice.handleWebhook(body);
  }
  @Post('chatbot')
  async handleChatbot(@Body() body: any) {
    // console.log(body);
    // await this.dataSource.getRepository(ChatBot).save({
    //   message: body.message,
    // });
    return this.webhookservice.handleChatbot(body);
  }
}
