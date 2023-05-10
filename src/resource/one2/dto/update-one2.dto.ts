import { PartialType } from '@nestjs/swagger';
import { CreateOne2Dto } from './create-one2.dto';

export class UpdateOne2Dto extends PartialType(CreateOne2Dto) {}
