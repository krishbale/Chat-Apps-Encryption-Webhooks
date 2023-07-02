import { Module } from '@nestjs/common';

import { WebHookService } from './webhooks.service';
import { WebHookController } from './webhooks.controller';
import { GatewayModule } from 'src/gateway/gateway.module';
@Module({
  imports: [GatewayModule],
  controllers: [WebHookController],
  providers: [WebHookService],
})
export class WebHookModule {}
