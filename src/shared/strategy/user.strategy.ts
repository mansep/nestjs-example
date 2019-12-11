import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import Config from '../../config/app';

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'user') {
  constructor() {
    super(Config.Jwt);
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    return {
      id: payload.id,
      name: payload.name,
      role: payload.role,
    };
  }
}
