import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOne1Dto {
  // one1 数据
  @IsNotEmpty()
  @IsString()
  gender: string;

  // one2 数据
  @IsNotEmpty()
  @IsString()
  name: string;
}
