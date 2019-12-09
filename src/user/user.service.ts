import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { Bcrypt } from '../utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async findByEmailOrError(email: string): Promise<User> {
    const user = this.findByEmail(email);

    if (user === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Usuario no encontrado',
        },
        404,
      );
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findByIdOrError(id: string): Promise<User> {
    const user = await this.findById(id);

    if (user === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Usuario no encontrado',
        },
        404,
      );
    }
    return user;
  }

  async create(newUser: UserDto): Promise<User> {
    if (newUser === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Debe incluir body',
        },
        400,
      );
    }
    let user = await this.findByEmail(newUser.email);
    if (user !== undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email está en uso',
        },
        400,
      );
    }
    newUser.password = Bcrypt.generate(newUser.password);
    delete newUser.id;
    try {
      user = await this.userRepository.save(newUser);
    } catch (ex) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
    return user;
  }
}
