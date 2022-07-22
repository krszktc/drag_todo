import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from '../controllers/project.controller';
import { ProjectService } from '../services/project.service';


describe('ProjectController', () => {
  let controller: ProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [{ provide: ProjectService, useValue: jest.fn() }]
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
