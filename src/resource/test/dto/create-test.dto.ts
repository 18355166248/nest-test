import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateTestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'name', example: '名字' })
  name: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: 'age', example: 12 })
  age: number;
}
