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

  findAll(): TaskDto[] {
    return this.tasks;
  }

  update(id: string, task: TaskDto): TaskDto {
    const foundTask = this.findById(id);

    foundTask.title = task.title;
    foundTask.description = task.description;
    foundTask.status = task.status;
    foundTask.expirantionDate = task.expirantionDate;

    return foundTask;
  }

  delete(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
