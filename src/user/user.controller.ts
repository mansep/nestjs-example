import {
  Controller,
  Request,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('user'))
  getUsers(@Request() req: any): Promise<UserDto> {
    return this.userService.findById(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('admin'))
  getUser(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findByIdOrError(id);
  }

  @Post()
  @UseGuards(AuthGuard('admin'))
  createUser(@Body() newUser: UserDto): Promise<UserDto> {
    return this.userService.create(newUser);
  }
}
