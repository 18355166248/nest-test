import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Photo } from 'src/resource/photo/entities/photo.entity';

export class CreateOne1Dto {
  // one1 数据
  @IsNotEmpty()
  @IsString()
  gender: string;

  // one2 数据
  @IsString()
  name: string;

  // photo 多
  @IsArray()
  photos: Photo[];
}
