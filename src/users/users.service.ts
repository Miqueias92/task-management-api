import { ConflictException, Injectable } from '@nestjs/common';
import { UsersDto } from './users.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { User } from 'src/db/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(usersDto: UsersDto): Promise<UsersDto> {
    const foundUser = await this.findByUsername(usersDto.username);
    if (foundUser) {
      throw new ConflictException(
        `User with username ${usersDto.username} already exists`,
      );
    }

    const user = new User();
    user.username = usersDto.username;
    user.password = bcryptHashSync(usersDto.password, 10);

    const { id, username } = await this.userRepository.save(user);
    return { id, username };
  }

  async findByUsername(username: string): Promise<UsersDto | null> {
    const foundUser = await this.userRepository.findOne({
      where: { username },
    });

    if (!foundUser) return null;

    return {
      id: foundUser.id,
      username: foundUser.username,
      password: foundUser.password,
    };
  }
}
