import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { Tasks } from '../entities/tasks.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskFilterDto } from '../dto/tasks-filter.dto';
import { TasksDto } from '../dto/tasks.dto';
import { Status } from '../enum/status.enum';
import { v4 as uuidv4 } from 'uuid';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Tasks>;
  let mockTaskId: string = uuidv4();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Tasks),
          useClass: Repository,
        }
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Tasks>>(getRepositoryToken(Tasks));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return tasks with pagination', async () => {
      const mockFilter: TaskFilterDto = {
        page: 1,
        take: 10,
        status: 'completed',
      };

      const mockTasks = []; // Mock tasks data
      const mockCount = 10;

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValueOnce([mockTasks, mockCount]),
      } as any);

      const result = await service.getTasks(mockFilter);

      expect(result).toEqual([mockTasks, mockCount]);

    });
  });

  describe('createTasks', () => {
    it('should create a new task', async () => {
      const mockTaskDto: TasksDto = {
        title: 'Test',
        description: 'Test Description',
        status: Status.Completed,
      };

      const mockTask: Tasks = {
        taskId: mockTaskId,
        title: 'Test',
        description: 'Test Description',
        status: Status.Completed,
      };

      jest.spyOn(repository, 'save').mockResolvedValueOnce(mockTask);

      const result = await service.createTasks(mockTaskDto);

      expect(result).toEqual(mockTask);
    });
  });

  describe('updateTasks', () => {
    it('should update task success', async () => {
      const mockTaskDto: TasksDto = {
        title: 'Updated Test',
        description: 'Updated Description',
        status: Status.Completed,
      };

      const mockTask: Tasks = {
        taskId: mockTaskId,
        title: 'Test',
        description: 'Test Description',
        status: Status.Completed,
      };

      jest.spyOn(service, 'findById').mockResolvedValueOnce(mockTask);
      jest.spyOn(repository, 'update').mockResolvedValueOnce({ affected: 1 } as any);

      const result = await service.updateTasks(mockTaskDto, mockTaskId);

      expect(result).toBe('Update success');
    });

    it('should return "Task not found" if task does not exist', async () => {
      jest.spyOn(service, 'findById').mockResolvedValueOnce(null);

      const mockTaskDto: TasksDto = {
        title: 'Updated Test',
        description: 'Updated Description',
        status: Status.Completed,
      };

      const result = await service.updateTasks(mockTaskDto, mockTaskId);

      expect(result).toBe('Task not found');
    });

    it('should return "Update fail" if update fails', async () => {
      const mockTask: Tasks = {
        taskId: mockTaskId,
        title: 'Test',
        description: 'Test Description',
        status: Status.Completed,
      };

      jest.spyOn(service, 'findById').mockResolvedValueOnce(mockTask);
      jest.spyOn(repository, 'update').mockResolvedValueOnce({ affected: 0 } as any);

      const mockTaskDto: TasksDto = {
        title: 'Updated Test',
        description: 'Updated Description',
        status: Status.Completed,
      };

      const result = await service.updateTasks(mockTaskDto, mockTaskId);

      expect(result).toBe('Update fail');
    });
  });

  describe('deleteTasks', () => {
    it('should delete task successfully', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValueOnce({ affected: 1 } as any);

      const result = await service.deleteTasks(mockTaskId);

      expect(result).toBe('Delete success');
    });

    it('should return "Delete fail" if delete fails', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValueOnce({ affected: 0 } as any);

      const result = await service.deleteTasks(mockTaskId);

      expect(result).toBe('Delete fail');
    });
  });

  describe('findById', () => {
    it('should return the task if found', async () => {
      const mockTask: Tasks = {
        taskId: mockTaskId,
        title: 'Test',
        description: 'Test Description',
        status: Status.Completed,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(mockTask);

      const result = await service.findById(mockTaskId);

      expect(result).toEqual(mockTask);
    });

    it('should return null if task not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      const result = await service.findById(mockTaskId);

      expect(result).toBeNull();
    });
  });

});
