import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { TaskDto } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { Success } from '../utils/response.utils';

@Controller('task')
export class TaskController {

  private readonly logger = new Logger(TaskController.name);

  constructor(private taskService: TaskService) { }

  @Get(':id')
  async getByProjectId(@Param('id') projectId: string) {
    this.logger.log(`Getting tasks for projectId: ${projectId}`)
    return await this.taskService.getByProjectId(projectId);
  }

  @Delete(':id')
  async delete(@Param('id') taskId: string) {
    this.logger.log(`Delete task by Id: ${taskId}`);
    await this.taskService.delete(taskId);
    return Success(`Task ${taskId} deleted`);
  }

  @Post(':id')
  async create(
    @Param('id') projectId: string,
    @Body() task: TaskDto
  ) {
    this.logger.log(`Create task id: ${task.id}`);
    await this.taskService.create(projectId, task);
    return Success(`Task ${task.id} created`);
  }

  @Patch()
  async update(@Body() task: TaskDto) {
    this.logger.log(`Update task id: ${task.id}`);
    await this.taskService.update(task);
    return Success(`Task ${task} updated`);
  }

}
