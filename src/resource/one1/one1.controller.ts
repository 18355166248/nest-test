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

@Controller('one1')
export class One1Controller {
  constructor(private readonly one1Service: One1Service) {}

  @Post()
  create(@Body() createOne1Dto: CreateOne1Dto) {
    return this.one1Service.create(createOne1Dto);
  }

  @Get()
  findAll() {
    return this.one1Service.findAll();
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
