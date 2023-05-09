import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '姓名', example: 'megalo' })
  name: string;

  @ApiProperty({ description: '描述', example: '图片描述' })
  description: string;

  @ApiProperty({ description: '文件名', example: '文件名' })
  filename: string;
}
