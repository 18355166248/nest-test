import { Injectable } from '@nestjs/common';
import { CreateOne2Dto } from './dto/create-one2.dto';
import { UpdateOne2Dto } from './dto/update-one2.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { One2 } from './entities/one2.entity';
import { Repository } from 'typeorm';

@Injectable()
export class One2Service {
  constructor(
    @InjectRepository(One2) private readonly photo: Repository<One2>,
  ) {}

  create(createOne2Dto: CreateOne2Dto) {
    return 'This action adds a new one2';
  }

  findAll() {
    return `This action returns all one2`;
  }

  findOne(id: number) {
    return `This action returns a #${id} one2`;
  }

  update(id: number, updateOne2Dto: UpdateOne2Dto) {
    return `This action updates a #${id} one2`;
  }

  remove(id: number) {
    return `This action removes a #${id} one2`;
  }
}
