import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
    return task;
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.find((task) => task.id === id);
    if (!foundTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return foundTask;
  }
}
