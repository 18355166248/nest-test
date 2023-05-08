import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testsRepository: Repository<Test>,
  ) {}

  create(createTestDto: CreateTestDto) {
    console.log(createTestDto);
    return 'This action adds a new test';
  }

  findAll(): Promise<Test[]> {
    return this.testsRepository.find();
  }

  findOne(id: number): Promise<Test | null> {
    return this.testsRepository.findOneBy({ id });
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  async remove(id: number): Promise<void> {
    await this.testsRepository.delete(id);
  }
}
