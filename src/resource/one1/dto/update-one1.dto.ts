import { PartialType } from '@nestjs/swagger';
import { CreateOne1Dto } from './create-one1.dto';

export class UpdateOne1Dto extends PartialType(CreateOne1Dto) {}
