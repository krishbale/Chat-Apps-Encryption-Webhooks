import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CatsService } from './cats.service';
// import { Cat } from './interfaces/cat.interface';
import { ValidationPipe } from './validation.pipe';
// import { createCatSchema } from './create-cats.dto';
import { CreateCatDto } from './create-cats.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  // @Post()
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }
  @Post()
  // @UsePipes(new ValidationPipe(CreateCatDto))
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.catsService.findOne();
  }
}
