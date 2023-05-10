import { Module } from '@nestjs/common';
import { One2Service } from './one2.service';
import { One2Controller } from './one2.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { One2 } from './entities/one2.entity';

@Module({
  imports: [TypeOrmModule.forFeature([One2])],
  controllers: [One2Controller],
  providers: [One2Service],
})
export class One2Module {}
