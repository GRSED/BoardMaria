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

  @Column()
  title: Date;

  @Column()
  content: string;

  @CreateDateColumn()
  writeDate: Date;

  @CreateDateColumn()
  noticeDate: string;

  @Column()
  writer: string;

  @Column()
  importance: number;

  @Column()
  isOpen: number;
}
