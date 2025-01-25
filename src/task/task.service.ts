import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto, TaskStatus } from './task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    task.id = uuid();
    task.status = TaskStatus.TODO;
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
