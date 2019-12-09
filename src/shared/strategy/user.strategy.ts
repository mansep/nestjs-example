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
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
      seller_id: payload.seller_id,
      role: payload.role,
      permissions: payload.permissions,
    };
  }
}
