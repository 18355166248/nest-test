import { Test, TestingModule } from '@nestjs/testing';
import { One1Service } from './one1.service';

describe('One1Service', () => {
  let service: One1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [One1Service],
    }).compile();

    service = module.get<One1Service>(One1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
