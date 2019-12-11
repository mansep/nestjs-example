import { UserDto } from '../user/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {

  @ApiProperty()
  email?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  token?: string;

  @ApiProperty()
  user?: UserDto;
}
