import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FindAllProps } from './photo.types';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('photo')
@ApiTags('相册')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }

  @Get()
  @ApiQuery({ name: 'name', description: '名称', required: false })
  @ApiQuery({ name: 'pageNo', description: '页' })
  @ApiQuery({ name: 'pageSize', description: '分页数' })
  findAll(@Query() query: FindAllProps) {
    console.log('query', query);
    return this.photoService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photoService.update(+id, updatePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }
}
