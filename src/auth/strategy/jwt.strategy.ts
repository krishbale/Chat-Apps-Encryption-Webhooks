import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTSECRET } from '../../constant'
import { DataSource } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( private readonly dataSource: DataSource) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWTSECRET,
    });
  }

  async validate(payload: any) {
    // if (payload.type !== TokenType.JW) throw new UnauthorizedException();
    const user = await this.dataSource.getRepository(User).findOne({ where: { id: payload.sub, isverified: true } });

    if (!user) throw new UnauthorizedException();
    // console.log(user)
    return user;
   
  }
}