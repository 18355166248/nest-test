import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({
    type: 'enum',
    enum: [1, 2, 3],
    default: 1,
  })
  status: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;
}
