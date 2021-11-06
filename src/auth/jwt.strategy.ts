import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as config from 'config';

// 다른 서비스 어디서든 사용할 수 있게 injectable이라고 명시를 해줘야 함
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    // super 키워드는 부모 오브젝트의 함수를 호출할 때 사용된다.
    super({
      // 토큰이 유효한지 체크하기 위해서 쓰는 시크릿 키 (기존에 만들 때 쓰는 것과 동일하게)
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      // 토큰을 헤더에서 bearer token 타입으로 가져오겠다~
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // 이후 validate가 실행이 된다.
  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
