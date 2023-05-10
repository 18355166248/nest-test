import { Test, TestingModule } from '@nestjs/testing';
import { One2Service } from './one2.service';

describe('One2Service', () => {
  let service: One2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [One2Service],
    }).compile();

    service = module.get<One2Service>(One2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
