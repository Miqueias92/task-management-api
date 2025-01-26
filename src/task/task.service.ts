import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto, TaskStatus } from './task.dto';
import { Task } from 'src/db/entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(taskDto: TaskDto): Promise<TaskDto> {
    const task = new Task();
    task.title = taskDto.title;
    task.description = taskDto.description;
    task.status = TaskStatus.TODO;
    task.expirationDate = taskDto.expirationDate;

    const newTask = await this.taskRepository.save(task);
    return newTask;
  }

  async findById(id: string): Promise<TaskDto> {
    const foundTask = await this.taskRepository.findOne({
      where: { id },
    });
    if (!foundTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return foundTask;
  }

  async findAll(): Promise<TaskDto[]> {
    return this.taskRepository.find();
  }

  async update(id: string, taskDto: TaskDto): Promise<TaskDto> {
    const foundTask = await this.findById(id);

    foundTask.title = taskDto.title;
    foundTask.description = taskDto.description;
    foundTask.status = taskDto.status;
    foundTask.expirationDate = taskDto.expirationDate;

    const updatedTask = await this.taskRepository.save(foundTask);
    return updatedTask;
  }

  async delete(id: string) {
    const foundTask = await this.findById(id);
    await this.taskRepository.remove(foundTask);
  }
}
