import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { ProjectEntity } from '../entities/project.entity';

@Injectable()
export class ProjectService {

  private readonly logger = new Logger(ProjectService.name);

  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepo: EntityRepository<ProjectEntity>
  ) { }

  async getByUserId(userId: string): Promise<ProjectEntity[]> {
    this.logger.log(`Querying projects for userId: ${userId}`);
    return await this.projectRepo.find({ client: { loginName: userId } });
  }
}
