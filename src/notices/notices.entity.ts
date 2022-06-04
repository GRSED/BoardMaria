import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  input_time: Date;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  grade: string;

  @Column()
  subject: string;
}
