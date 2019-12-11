import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import Config from './config/app';

@Module({
  imports: [
    TypeOrmModule.forRoot(Config.database as TypeOrmModuleOptions),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
