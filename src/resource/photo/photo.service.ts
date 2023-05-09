import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FindAllProps } from './photo.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private readonly photo: Repository<Photo>,
  ) {}
  create(createPhotoDto: CreatePhotoDto) {
    console.log('createPhotoDto', createPhotoDto);
    const p = new Photo();
    p.name = createPhotoDto.name;
    p.description = createPhotoDto.description;
    p.filename = createPhotoDto.filename;
    return this.photo.save(p);
  }

  async findAll(query: FindAllProps) {
    const data = await this.photo.find({
      where: {
        name: Like(`%${query.name}`),
      },
      order: {
        id: 'DESC',
      },
      skip: (query.pageNo - 1) * query.pageSize,
      take: query.pageSize,
    });
    console.log(data);
    return {
      data,
    };
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
