import { One2 } from 'src/resource/one2/entities/one2.entity';
import { Photo } from 'src/resource/photo/entities/photo.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class One1 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    name: 'gender',
    default: null,
    comment: '性别',
  })
  gender: string;

  @OneToOne(() => One2, (one2) => one2.one1)
  one2: One2;

  @OneToMany(() => Photo, (photo) => photo.one1)
  photos: Photo[];
}
