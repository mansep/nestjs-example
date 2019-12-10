import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import Config from '../../config/app';

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'user') {
  constructor() {
    super(Config.Jwt);
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      name: payload.name,
      role: payload.role,
    };
  }
}
