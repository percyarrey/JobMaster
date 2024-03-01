import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(public configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      /* ERROR */
      /* Am suppose to use configService.get<string>('JWT_SECRET') not process.env.JWT_SECRET */
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: any) {
    return payload;
  }
}
