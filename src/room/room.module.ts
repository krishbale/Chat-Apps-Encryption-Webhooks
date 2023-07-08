import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { GatewayModule } from 'src/gateway/gateway.module';
import { Room } from './entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), GatewayModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
