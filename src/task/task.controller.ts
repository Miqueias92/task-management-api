import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() task: TaskDto): TaskDto {
    return this.taskService.create(task);
  }

  @Get('/:id')
  findById(@Param('id') id: string): TaskDto {
    return this.taskService.findById(id);
  }

  @Get()
  findAll(): TaskDto[] {
    return this.taskService.findAll();
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() task: TaskDto): TaskDto {
    return this.taskService.update(id, task);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
