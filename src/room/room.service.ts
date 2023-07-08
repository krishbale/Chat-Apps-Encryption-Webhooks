import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { MyGateway } from 'src/gateway/gateway';
import { DataSource } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(private mygateway: MyGateway, private dataSource: DataSource) {}
  async create(_createRoomDto: CreateRoomDto) {
    const room = await this.dataSource.getRepository('Room').save({
      name: _createRoomDto.name,
    });
    // await this.mygateway.server.to().emit('room', room);
    return room;
  }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
