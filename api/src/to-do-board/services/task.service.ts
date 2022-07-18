import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { ProjectEntity } from '../entities/project.entity';
import { TaskEntity } from '../entities/task.entity';
import { TaskDto } from '../models/task.model';

@Injectable()
export class TaskService {

  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepo: EntityRepository<TaskEntity>,
    @InjectRepository(ProjectEntity)
    private projectRepo: EntityRepository<ProjectEntity>,
  ) { }

  async getByProjectId(projectId: string): Promise<TaskEntity[]> {
    this.logger.log(`Querying tasks for projectId: ${projectId}`);
    return await this.tasksRepo.find({ project: { id: projectId } });
  }

  async create(projectId: string, dto: TaskDto): Promise<void> {
    this.logger.log(`Command to create task id: ${dto.id}`);
    const project = await this.projectRepo.findOne(projectId);
    const task = TaskEntity.fromDto(project, dto);
    return await this.tasksRepo.persistAndFlush(task);
  }

  async update(dto: TaskDto): Promise<void> {
    this.logger.log(`Command to update task id: ${dto.id}`);
    const task = await this.tasksRepo.findOne(dto.id);
    wrap(task).assign(dto);
    return await this.tasksRepo.flush();
  }

  async delete(taskId: string): Promise<void> {
    this.logger.log(`Command to delete task id: ${taskId}`);
    const task = await this.tasksRepo.findOne(taskId);
    return this.tasksRepo.removeAndFlush(task);
  }

}
