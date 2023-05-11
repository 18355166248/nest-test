import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { One1Service } from './one1.service';
import { CreateOne1Dto } from './dto/create-one1.dto';
import { UpdateOne1Dto } from './dto/update-one1.dto';
import { ConfigService } from '@nestjs/config';

@Controller('one1')
export class One1Controller {
  constructor(
    private readonly one1Service: One1Service,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createOne1Dto: CreateOne1Dto) {
    console.log(11, this.configService.get('db'));
    return this.one1Service.create(createOne1Dto);
  }

  @Post('photos')
  createWithPhotos(@Body() createOne1Dto: CreateOne1Dto) {
    return this.one1Service.createWithPhoto(createOne1Dto);
  }

  @Get()
  findAll() {
    return this.one1Service.findAll();
  }

  @Get('photos')
  findAllWithPhtots() {
    return this.one1Service.findAllWithPhtots();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.one1Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOne1Dto: UpdateOne1Dto) {
    return this.one1Service.update(+id, updateOne1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.one1Service.remove(+id);
  }
}
