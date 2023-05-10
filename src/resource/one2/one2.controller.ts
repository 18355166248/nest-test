import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { One2Service } from './one2.service';
import { CreateOne2Dto } from './dto/create-one2.dto';
import { UpdateOne2Dto } from './dto/update-one2.dto';

@Controller('one2')
export class One2Controller {
  constructor(private readonly one2Service: One2Service) {}

  @Post()
  create(@Body() createOne2Dto: CreateOne2Dto) {
    return this.one2Service.create(createOne2Dto);
  }

  @Get()
  findAll() {
    return this.one2Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.one2Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOne2Dto: UpdateOne2Dto) {
    return this.one2Service.update(+id, updateOne2Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.one2Service.remove(+id);
  }
}
