import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FindAllProps } from './photo.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository, Brackets } from 'typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private readonly photo: Repository<Photo>,
  ) {}

  async create(createPhotoDto: CreatePhotoDto) {
    const p = new Photo();
    p.name = createPhotoDto.name;
    p.description = createPhotoDto.description;
    p.filename = createPhotoDto.filename;
    try {
      await this.photo.save(p);
      return 1;
    } catch (error) {
      return 0;
    }
  }

  async findAll(query: FindAllProps) {
    const qb = this.photo
      .createQueryBuilder('photo222')
      .where(
        new Brackets((qb) => {
          // 值不为空，进行模糊搜索
          if (query.name) {
            return qb.where('photo222.name LIKE :name', {
              name: `%${query.name}%`,
            });
          } else {
            return qb;
          }
        }),
      )
      .orderBy('photo222.id', 'DESC')
      // 除前 skip 条以外的所有数据
      .skip(((query.pageNo || 1) - 1) * (query.pageSize || 10))
      // 返回前 take 条数据
      .take(query.pageSize || 10);

    const res = await qb.getManyAndCount();
    return {
      total: res[1],
      data: res[0],
    };
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    try {
      await this.photo.update(id, updatePhotoDto);
      return 1;
    } catch (error) {
      return 0;
    }
  }

  async remove(id: number) {
    try {
      await this.photo.delete(id);
      return 1;
    } catch (error) {
      return 0;
    }
    return;
  }
}
