import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PlacementController } from './controllers/placement.controller';
import { ProjectController } from './controllers/project.controller';
import { TaskController } from './controllers/task.controller';
import { PlacementEntity } from './entities/placement.entity';
import { ProjectEntity } from './entities/project.entity';
import { TaskEntity } from './entities/task.entity';
import { PlacementService } from './services/placement.service';
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';

@Module({
  imports: [MikroOrmModule.forFeature([TaskEntity, ProjectEntity, PlacementEntity])],
  controllers: [PlacementController, ProjectController, TaskController],
  providers: [PlacementService, ProjectService, TaskService]
})
export class ToDoModule {}
