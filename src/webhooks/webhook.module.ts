import { Module } from '@nestjs/common';

import { WebHookService } from './webhooks.service';
import { WebHookController } from './webhooks.controller';
@Module({
  imports: [],
  controllers: [WebHookController],
  providers: [WebHookService],
})
export class WebHookModule {}
