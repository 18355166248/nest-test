import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOne1Dto } from './dto/create-one1.dto';
import { UpdateOne1Dto } from './dto/update-one1.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { One1 } from './entities/one1.entity';
import { DataSource, Repository } from 'typeorm';
import { One2 } from '../one2/entities/one2.entity';
import { Photo } from '../photo/entities/photo.entity';

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
      const mainOne1 = await queryRunner.manager.save(one1);
      const subOne2 = await queryRunner.manager.save(one2);
      // 设置外键 id
      mainOne1.one2 = subOne2;
      await queryRunner.manager.save(mainOne1);
      subOne2.one1 = mainOne1;
      await queryRunner.manager.save(subOne2);
      await queryRunner.commitTransaction();
      return 1;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      return 0;
    } finally {
      console.log('finally');
      await queryRunner.release();
    }
  }

  async createWithPhoto(createOne1Dto: CreateOne1Dto) {
    const photos = createOne1Dto.photos;
    if (Array.isArray(photos) && photos.length) {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();

      await queryRunner.startTransaction();

      const pList = [];

      photos.forEach(async (photo) => {
        const p = new Photo();
        p.name = photo.name;
        pList.push(p);
      });

      return Promise.all(pList.map((p) => queryRunner.manager.save(p))).then(
        async (photos) => {
          const one1 = new One1();
          one1.gender = createOne1Dto.gender;
          one1.photos = photos;

          try {
            const res = await queryRunner.manager.save(one1);
            await queryRunner.commitTransaction();

            return res;
          } catch (error) {
            await queryRunner.rollbackTransaction();
          } finally {
            await queryRunner.release();
          }
        },
      );
    } else {
      return 0;
    }
  }

  async findAll() {
    try {
      const res = await this.one1
        .createQueryBuilder('one1')
        .leftJoinAndSelect('one1.one2', 'one2')
        .orderBy('one1.id', 'DESC')
        .getManyAndCount();

      return {
        data: res[0],
        total: res[1],
      };
    } catch (error) {
      return new NotFoundException(`can't find`);
    }
  }

  async findAllWithPhtots() {
    try {
      const res = await this.one1
        .createQueryBuilder('one1')
        .leftJoinAndSelect('one1.photos', 'photos')
        .orderBy('one1.id', 'DESC')
        .getManyAndCount();

      return {
        data: res[0],
        total: res[1],
      };
    } catch (error) {
      return new NotFoundException(`can't find`);
    }
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
