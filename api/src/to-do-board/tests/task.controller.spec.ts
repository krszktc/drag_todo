import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../controllers/task.controller';
import { TaskService } from '../services/task.service';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [{ provide: TaskService, useValue: jest.fn() }]
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
