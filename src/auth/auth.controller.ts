import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { AuthResultDto } from './auth-result.dto';
import { UserDto } from '../user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() auth: AuthDto): Promise<AuthResultDto> {
    return await this.authService.login(auth);
  }

  @Post('register')
  async register(@Body() newUser: UserDto): Promise<UserDto> {
    return await this.authService.register(newUser);
  }
}
