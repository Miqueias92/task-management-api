import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() task: TaskDto): Promise<TaskDto> {
    return this.taskService.create(task);
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<TaskDto> {
    return this.taskService.findById(id);
  }

  @Get()
  async findAll(): Promise<TaskDto[]> {
    return await this.taskService.findAll();
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() task: TaskDto,
  ): Promise<TaskDto> {
    return await this.taskService.update(id, task);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.taskService.delete(id);
  }
}
