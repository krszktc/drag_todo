import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectService } from '../services/project.service';

const mockRepo = {
  find: jest.fn(),
}


describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService, {
        provide: getRepositoryToken(ProjectEntity),
        useValue: mockRepo
      }],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should get project by userId', async () => {
    // GIVEN
    const userId = 'MockUserId';
    const searchCriteria = {
      client: { loginName: userId }
    }
    // WHEN
    await service.getByUserId(userId);
    // THEN
    expect(mockRepo.find).toBeCalledTimes(1);
    expect(mockRepo.find).toBeCalledWith(searchCriteria);
  })
});
