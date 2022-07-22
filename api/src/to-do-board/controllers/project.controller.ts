import { Controller, Get, Logger } from '@nestjs/common';
import { User } from '../../decorators/user.decorator';
import { ProjectService } from '../services/project.service';

@Controller('project')
export class ProjectController {

  private readonly logger = new Logger(ProjectController.name);

  constructor(private projectService: ProjectService) { }

  @Get()
  async getByUserId(@User() userId: string) {
    this.logger.log(`Getting projects for user: ${userId}`);
    return await this.projectService.getByUserId(userId);
  }

}
