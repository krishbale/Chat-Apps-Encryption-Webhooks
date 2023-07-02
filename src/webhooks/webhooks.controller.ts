import { Body, Controller, Post } from '@nestjs/common';
import { WebHookService } from './webhooks.service';
import { ChatBot } from './entity/bot.entity';

@Controller()
export class WebHookController {
  dataSource: any;
  constructor(private readonly webhookservice: WebHookService) {}

  @Post('webhook')
  async handleWebhook(@Body() body: any) {
    // await this.dataSource.getRepository(ChatBot).save({
    //   message: body.message,
    // });
    return this.webhookservice.handleWebhook(body);
  }
}
