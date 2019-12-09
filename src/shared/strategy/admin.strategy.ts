import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import Config from '../../config/app';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor() {
    super(Config.Jwt);
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    if (payload.role !== 'admin') {
      throw new UnauthorizedException(
        'No tiene permisos suficientes para realizar la acción solicitada',
      );
    }

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
