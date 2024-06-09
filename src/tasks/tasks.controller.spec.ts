import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskFilterDto } from '../dto/tasks-filter.dto';
import { PaginationDto } from '../utils/pagination.dto';
import { DtoMapper } from '../utils/dto-mapper.dto';
import { TasksResponseDto } from '../dto/tasks-response.dto';
import { v4 as uuidv4 } from 'uuid';
import { Status } from '../enum/status.enum';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { ApiResponseDto } from '../utils/api-response.dto';
import { TasksDto } from '../dto/tasks.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;
  let mockTaskId: string = uuidv4();

  const mockTasksService ={
    getTasks: jest.fn(),
    findById: jest.fn(),
    createTasks: jest.fn(),
    updateTasks: jest.fn(),
    deleteTasks: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return paginated tasks', async () => {
      const mockFilter: TaskFilterDto = {
        page: 1,
        take: 10,
        status: 'completed',
      };

      const mockTasks = [];
      const mockCount = 10;

      mockTasksService.getTasks.mockResolvedValueOnce([mockTasks, mockCount]);

      const result = await controller.getTasks(mockFilter);

      expect(result).toEqual(PaginationDto.from(DtoMapper.mapMany(mockTasks, TasksResponseDto), mockFilter, mockCount));
      expect(service.getTasks).toHaveBeenCalledWith(mockFilter);
    });
  });

  describe('getTask', () => {
    it('should return the task if found', async () => {
      const mockTask = { taskId: mockTaskId, title: 'Test Task', description: 'Test Description', status: Status.Completed };

      mockTasksService.findById.mockResolvedValueOnce(mockTask);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.getTask(mockTaskId, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(new ApiResponseDto(HttpStatus.OK, mockTask, 'Get task success'))
    });

    it('should return 404 if task not found', async () => {
      const mockTaskId = 'some-uuid';

      mockTasksService.findById.mockResolvedValueOnce(null);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.getTask(mockTaskId, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith(new ApiResponseDto(HttpStatus.NOT_FOUND, null, 'Task not found'));
    });
  });

  describe('createTasks', () => {
    it('should create a new task', async () => {
      const mockTaskDto: TasksDto = { title: 'Test Task', description: 'Test Description', status: Status.Completed };
      const mockTask = { ...mockTaskDto, taskId: 'some-uuid' };

      mockTasksService.createTasks.mockResolvedValueOnce(mockTask);

      const result = await controller.createTasks(mockTaskDto);

      expect(result).toEqual(new ApiResponseDto(HttpStatus.CREATED, mockTask, 'Create task success'));
      expect(service.createTasks).toHaveBeenCalledWith(mockTaskDto);
    });

    it('should return 400 if task creation fails', async () => {
      const mockTaskDto: TasksDto = { title: 'Test Task', description: 'Test Description', status: Status.Completed };

      mockTasksService.createTasks.mockResolvedValueOnce(null);

      const result = await controller.createTasks(mockTaskDto);

      expect(result).toEqual(new ApiResponseDto(HttpStatus.BAD_REQUEST, null, 'Create task fail'));
      expect(service.createTasks).toHaveBeenCalledWith(mockTaskDto);
    });
  });

  describe('updateTasks', () => {
    it('should update the task successfully', async () => {
      const mockTaskDto: TasksDto = { title: 'Updated Task', description: 'Updated Description', status: Status.Completed };
      const mockTaskId = 'some-uuid';

      mockTasksService.updateTasks.mockResolvedValueOnce('Update success');

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.updateTasks(mockTaskDto, mockTaskId, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(new ApiResponseDto(HttpStatus.OK, null, 'Update success'));
    });

    it('should return 404 if task not found', async () => {
      const mockTaskDto: TasksDto = { title: 'Updated Task', description: 'Updated Description', status: Status.Completed };
      const mockTaskId = 'some-uuid';

      mockTasksService.updateTasks.mockResolvedValueOnce('Task not found');

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.updateTasks(mockTaskDto, mockTaskId, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith(new ApiResponseDto(HttpStatus.NOT_FOUND, null, 'Task not found'));
    });

    it('should return 400 if update fails', async () => {
      const mockTaskDto: TasksDto = { title: 'Updated Task', description: 'Updated Description', status: Status.Completed };
      const mockTaskId = 'some-uuid';

      mockTasksService.updateTasks.mockResolvedValueOnce('Update fail');

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.updateTasks(mockTaskDto, mockTaskId, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith(new ApiResponseDto(HttpStatus.BAD_REQUEST, null, 'Update fail'));
    });
  });

  describe('deleteTasks', () => {
    it('should delete the task successfully', async () => {
      const mockTaskId = 'some-uuid';

      mockTasksService.deleteTasks.mockResolvedValueOnce('Delete success');

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.deleteTasks(mockTaskId, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(new ApiResponseDto(HttpStatus.OK, null, 'Delete success'));
    });

    it('should return 400 if delete fails', async () => {
      const mockTaskId = 'some-uuid';

      mockTasksService.deleteTasks.mockResolvedValueOnce('Delete fail');

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.deleteTasks(mockTaskId, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith(new ApiResponseDto(HttpStatus.BAD_REQUEST, null, 'Delete fail'));
    });
  });

});
