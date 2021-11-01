// 클래스는 인터페이스와 다르게 런타임에서 작동하기 때문에
// 파이프같은 기능을 이용할 때 더 유용함.
// 그래서 클래스를 사용해서 DTO를 작성.

export class CreateBoardDto {
  title: string;
  description: string;
}
