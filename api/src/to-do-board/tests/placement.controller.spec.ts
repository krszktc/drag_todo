import { Test, TestingModule } from '@nestjs/testing';
import { PlacementController } from '../controllers/placement.controller';
import { PlacementService } from '../services/placement.service';

describe('PlacementController', () => {
  let controller: PlacementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacementController],
      providers: [{ provide: PlacementService, useValue: jest.fn() }]
    }).compile();

    controller = module.get<PlacementController>(PlacementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
