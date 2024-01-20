import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JWTSECRET } from '../../constant';
import { DataSource } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly dataSource: DataSource) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWTSECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.dataSource
      .getRepository(User)
      .findOne({ where: { id: payload.sub, isverified: true } });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
