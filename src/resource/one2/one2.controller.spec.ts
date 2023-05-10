import { Test, TestingModule } from '@nestjs/testing';
import { One2Controller } from './one2.controller';
import { One2Service } from './one2.service';

describe('One2Controller', () => {
  let controller: One2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [One2Controller],
      providers: [One2Service],
    }).compile();

    controller = module.get<One2Controller>(One2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
