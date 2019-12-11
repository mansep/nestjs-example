import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  id?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ['user', 'admin']})
  role?: string;

  @ApiProperty()
  password?: string;
}
