import { Body, Controller, Get, Logger, Param, Put } from '@nestjs/common';
import { PlacementDto } from '../models/placement.model';
import { PlacementService } from '../services/placement.service';
import { Success } from '../utils/response.utils';

@Controller('placement')
export class PlacementController {

  private readonly logger = new Logger(PlacementController.name);

  constructor(private placementService: PlacementService) { }

  @Get(':id')
  async bedByProjectId(@Param('id') projectId: string) {
    this.logger.log(`Getting placement for projectId: ${projectId}`);
    return await this.placementService.getByProjectId(projectId);
  }

  @Put()
  async update(@Body() placement: PlacementDto) {
    this.logger.log(`Save placement for projectId: ${placement.projectId}`);
    await this.placementService.update(placement);
    return Success(`Placement ${placement.projectId} saved`);
  }

}
