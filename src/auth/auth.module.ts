import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import Config from '../config/app';
import { UserStrategy } from '../shared/strategy/user.strategy';
import { AdminStrategy } from '../shared/strategy/admin.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: Config.Jwt.secretOrKey,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserStrategy, AdminStrategy],
})
export class AuthModule {}
