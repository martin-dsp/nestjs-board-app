import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
// 굳이 데이터베이스를 갔다와서 이미 존재하는지 확인할 필요가 없다.
// 원하는 에러를 던져주려면, controller 레벨에서 try catch를 써야한다.
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // type은 Board에서 정의된 타입이며, board에서는 board.user와 엮여있고, eager: true는 user를 가져올 때 가져오겠다!
  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
