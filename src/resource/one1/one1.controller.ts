import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { One1Service } from './one1.service';
import { CreateOne1Dto } from './dto/create-one1.dto';
import { UpdateOne1Dto } from './dto/update-one1.dto';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('one1')
export class One1Controller {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService,
    private readonly one1Service: One1Service,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createOne1Dto: CreateOne1Dto) {
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
