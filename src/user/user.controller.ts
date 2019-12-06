import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findById(id);
  }

  @Post()
  createUser(@Body() newUser: UserDto): Promise<UserDto> {
      return this.userService.create(newUser);
  }
}
