import { Body, Controller, Post } from '@nestjs/common';
import { WebHookService } from './webhooks.service';

@Controller()
export class WebHookController {
  constructor(private readonly webhookservice: WebHookService) {}

  @Post('webhook')
  handleWebhook(@Body() body: any) {
    return this.webhookservice.handleWebhook(body);
  }
}
