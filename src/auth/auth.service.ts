import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { Bcrypt } from '../utils/bcrypt';
import { AuthResultDto } from './auth-result.dto';
import { UserDto } from '../user/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async login(auth: AuthDto): Promise<AuthResultDto> {
    const error = {
      status: HttpStatus.UNAUTHORIZED,
      error: 'Usuario o password no validos',
    };

    const user = await this.userService.findByEmail(auth.email);

    if (user === undefined) {
      throw new HttpException(error, 401);
    }
    if (!Bcrypt.compare(user.password, auth.password)) {
      throw new HttpException(error, 401);
    }

    const payload = { id: user.id, name: user.name, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      user,
      token,
    };
  }

  async register(newUser: UserDto): Promise<UserDto> {
    newUser.role = 'user';
    return this.userService.create(newUser);
  }
}
