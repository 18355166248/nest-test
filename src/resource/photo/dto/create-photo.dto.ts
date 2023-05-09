import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  filename: string;
}
