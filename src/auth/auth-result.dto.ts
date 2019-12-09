import { UserDto } from '../user/user.dto';

export class AuthResultDto {
  token: string;
  user: UserDto;
}
