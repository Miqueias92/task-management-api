import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersDto } from './users.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UsersDto[] = [];

  create(usersDto: UsersDto): UsersDto {
    usersDto.id = uuid();
    usersDto.password = bcryptHashSync(usersDto.password, 10);
    this.users.push(usersDto);
    return usersDto;
  }

  findByUsername(username: string): UsersDto | null {
    return this.users.find((user) => user.username === username);
  }

  findAll(): UsersDto[] {
    return this.users;
  }

  findById(id: string): UsersDto {
    const foundUser = this.users.find((user) => user.id === id);
    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return foundUser;
  }
}
