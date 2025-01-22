import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() usersDto: UsersDto): UsersDto {
    return this.usersService.create(usersDto);
  }

  @Get()
  findAll(): UsersDto[] {
    return this.usersService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string): UsersDto {
    return this.usersService.findById(id);
  }
}
