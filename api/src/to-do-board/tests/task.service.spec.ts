import { EntityManager } from '@mikro-orm/core';
import { getRepositoryToken, MikroOrmModule } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import config from '../../../mikro-orm.config';
import { ProjectEntity } from '../entities/project.entity';
import { TaskEntity } from '../entities/task.entity';
import { TaskService } from '../services/task.service';


const getMockRepo = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  flush: jest.fn(),
  removeAndFlush: jest.fn(),
  persistAndFlush: jest.fn(),
});

const mrMock = {
  wrap: jest.fn(() => 'test')
}

let mockRepo = getMockRepo();

describe('TaskService', () => {
  let service: TaskService;
  beforeEach(async () => {
    mockRepo = getMockRepo();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...config,
          tsNode: true
        })
      ],
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: mockRepo
        },
        {
          provide: getRepositoryToken(ProjectEntity),
          useValue: mockRepo
        },
        {
          provide: EntityManager,
          useValue: mrMock,
        }
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('Should get task by projectId', async () => {
    // GIVEN\
    const projectId = "MockProjectId"
    const searchCriteria = {
      project: { id: projectId }
    }
    // WHEN
    await service.getByProjectId(projectId)
    // THEN
    expect(mockRepo.find).toBeCalledTimes(1);
    expect(mockRepo.find).toBeCalledWith(searchCriteria);
  })

  it('Should create new Task', async () => {
    // GIVEN
    let persistedEntity: TaskEntity;
    const projectId = 'MockProjectId';
    const dto = {
      id: 'DtoId',
      name: 'DtoName',
      description: 'DtoDescription',
    }
    // WHEN 
    mockRepo.persistAndFlush = jest.fn((value: any) => persistedEntity = value)
    await service.create(projectId, dto);
    // THEN
    expect(mockRepo.findOne).toBeCalledTimes(1);
    expect(mockRepo.persistAndFlush).toBeCalledTimes(1);
    expect(mockRepo.findOne).toBeCalledWith(projectId);
    expect(persistedEntity.id).toBe(dto.id);
    expect(persistedEntity.name).toBe(dto.name);
    expect(persistedEntity.description).toBe(dto.description);
  });

  it('Should update Task', async () => {
    // GIVEN
    const dto = {
      id: 'MockId',
      name: 'MockName',
      description: 'MockDescription',
    }
    const entity = new TaskEntity('someId', 'someName');
    // WHEN
    mockRepo.findOne.mockReturnValueOnce(entity);
    await service.update(dto);
    // THEN
    expect(mockRepo.findOne).toBeCalledTimes(1);
    expect(mockRepo.flush).toBeCalledTimes(1);
    expect(mockRepo.findOne).toBeCalledWith(dto.id);
    expect(entity.id).toBe(dto.id);
    expect(entity.name).toBe(dto.name);
    expect(entity.description).toBe(dto.description);
  })

  it('Should delete task', async () => {
    // GIVEN
    const taskId = 'MockTaskId'
    // WHEN
    await service.delete(taskId);
    // THEN
    expect(mockRepo.findOne).toBeCalledTimes(1);
    expect(mockRepo.findOne).toBeCalledWith(taskId);
    expect(mockRepo.removeAndFlush).toBeCalledTimes(1);
  })

});
