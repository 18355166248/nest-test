import { Injectable } from '@nestjs/common';
import { CreateOne1Dto } from './dto/create-one1.dto';
import { UpdateOne1Dto } from './dto/update-one1.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { One1 } from './entities/one1.entity';
import { DataSource, Repository } from 'typeorm';
import { One2 } from '../one2/entities/one2.entity';

@Injectable()
export class One1Service {
  constructor(
    private readonly connection: DataSource,
    @InjectRepository(One1) private readonly one1: Repository<One1>,
  ) {}

  async create(createOne1Dto: CreateOne1Dto) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();

    const one1 = new One1();
    one1.gender = createOne1Dto.gender;

    const one2 = new One2();
    one2.name = createOne1Dto.name;

    await queryRunner.startTransaction();

    try {
      // 先增主表
      const mainOne1 = await queryRunner.manager.save(one1);
      // 再增副表
      const subOne2 = await queryRunner.manager.save(one2);

      // 设置外键 id
      mainOne1.one2 = subOne2;
      await queryRunner.manager.save(one1);
      return 1;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      return 0;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all one1`;
  }

  findOne(id: number) {
    return `This action returns a #${id} one1`;
  }

  update(id: number, updateOne1Dto: UpdateOne1Dto) {
    return `This action updates a #${id} one1`;
  }

  remove(id: number) {
    return `This action removes a #${id} one1`;
  }
}
