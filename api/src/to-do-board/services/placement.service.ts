import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { PlacementEntity } from '../entities/placement.entity';
import { PlacementDto } from '../models/placement.model';

@Injectable()
export class PlacementService {

  private readonly logger = new Logger(PlacementService.name);

  constructor(
    @InjectRepository(PlacementEntity)
    private placementRepo: EntityRepository<PlacementEntity>
  ) { }

  async getByProjectId(projectId: string): Promise<PlacementEntity> {
    this.logger.log(`Querying placement for projectId: ${projectId}`);
    return await this.placementRepo.findOne({ projectId: projectId });
  }

  async update(placement: PlacementDto): Promise<void> {
    this.logger.log(`Command to save placement for projectId: ${placement.projectId}`);
    const entity = await this.placementRepo.findOne({ projectId: placement.projectId });
    entity.placement = placement.placement;
    return await this.placementRepo.flush();
  }

}
