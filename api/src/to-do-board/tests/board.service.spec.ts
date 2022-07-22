import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { PlacementEntity } from '../entities/placement.entity';
import { PlacementDto } from '../models/placement.model';
import { PlacementService } from '../services/placement.service';



let mockRepo = {
  findOne: jest.fn(),
  flush: jest.fn(),
}


describe('PlacementService', () => {
  let service: PlacementService;

  beforeEach(async () => {
    mockRepo = {
      findOne: jest.fn(),
      flush: jest.fn(),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlacementService,
        {
          provide: getRepositoryToken(PlacementEntity),
          useValue: mockRepo
        }],
    }).compile();

    service = module.get<PlacementService>(PlacementService);
  });

  it('Should get project by Id', async () => {
    // GIVEN
    const searchCriteria = { projectId: "MockProject" }
    // WHEN
    await service.getByProjectId(searchCriteria.projectId);
    // THEN
    expect(mockRepo.findOne).toBeCalledTimes(1);
    expect(mockRepo.findOne).toBeCalledWith(searchCriteria)
  })

  it('Should update project by Dto', async () => {
    // GIVEN
    const dao: PlacementDto = {
      projectId: "MockDaoId",
      placement: "MockDaoPlacement",
    };
    const searchCriteria = {
      projectId: dao.projectId
    };
    const entity = new PlacementEntity(
      "EntityProjectId",
      "EntityPlacement",
    );
    // WHEN
    mockRepo.findOne.mockReturnValueOnce(entity);
    await service.update(dao);
    // THEN
    expect(mockRepo.findOne).toBeCalledTimes(1);
    expect(mockRepo.flush).toBeCalledTimes(1);
    expect(mockRepo.findOne).toBeCalledWith(searchCriteria);
    expect(entity.placement).toBe(dao.placement);
  })

});
