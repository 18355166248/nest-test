import { Module } from '@nestjs/common';
import { One1Service } from './one1.service';
import { One1Controller } from './one1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { One1 } from './entities/one1.entity';

@Module({
  imports: [TypeOrmModule.forFeature([One1])],
  controllers: [One1Controller],
  providers: [One1Service],
})
export class One1Module {}
