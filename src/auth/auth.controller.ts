import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { AuthResultDto } from './auth-result.dto';
import { UserDto } from '../user/user.dto';
import { ApiTags, ApiHeader, ApiBody } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(200)
  @Post('login')
  async login(@Body() auth: AuthDto): Promise<AuthResultDto> {
    return await this.authService.login(auth);
  }

  @Post('register')
  async register(@Body() newUser: UserDto): Promise<UserDto> {
    return await this.authService.register(newUser);
  }
}
