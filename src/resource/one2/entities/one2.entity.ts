import { One1 } from 'src/resource/one1/entities/one1.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class One2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 一对一关系
  @OneToOne(() => One1, (one1) => one1.one2)
  @JoinColumn()
  one1: One1;
}
