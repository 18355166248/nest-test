import { One1 } from 'src/resource/one1/entities/one1.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
  })
  name: string;

  @Column({
    type: 'text',
    default: null,
  })
  description: string;

  @Column({
    type: 'text',
    default: null,
  })
  filename: string;

  @ManyToOne(() => One1, (one1) => one1.photos)
  one1: One1;
}
