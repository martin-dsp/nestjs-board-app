import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './board-status.enum';

// 엔티티임을 나타내는 데 사용
@Entity()
export class Board extends BaseEntity {
  // 기본키 열임을 나타내는 데 사용
  @PrimaryGeneratedColumn()
  id: number;

  // 열을 나타내는 데 사용
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;
}
