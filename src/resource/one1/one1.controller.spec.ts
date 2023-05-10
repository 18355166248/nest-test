import { Test, TestingModule } from '@nestjs/testing';
import { One1Controller } from './one1.controller';
import { One1Service } from './one1.service';

describe('One1Controller', () => {
  let controller: One1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [One1Controller],
      providers: [One1Service],
    }).compile();

    controller = module.get<One1Controller>(One1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
