import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PasswordInterceptor } from '../shared/interceptors/password.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: PasswordInterceptor,
    },
    UserService,
  ],
})
export class UserModule {}
