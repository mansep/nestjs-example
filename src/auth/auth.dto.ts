import { UserDto } from '../user/user.dto';

export class AuthDto {
  email?: string;
  password?: string;
  token?: string;
  user?: UserDto;
}
