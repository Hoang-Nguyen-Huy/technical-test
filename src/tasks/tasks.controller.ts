import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { ApiResponseDto } from '../utils/api-response.dto';
import { Response } from 'express';
import { TaskFilterDto } from '../dto/tasks-filter.dto';
import { PaginationDto } from '../utils/pagination.dto';
import { DtoMapper } from '../utils/dto-mapper.dto';
import { TasksResponseDto } from '../dto/tasks-response.dto';
import { TasksDto } from '../dto/tasks.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService
    ) {};

    @Get()
    async getTasks(@Query() filter: TaskFilterDto) {
        const [tasks, count] = await this.tasksService.getTasks(filter);
        return PaginationDto.from(DtoMapper.mapMany(tasks, TasksResponseDto), filter, count);
    }

    @Get('/:taskId')
    async getTask(@Param('taskId') taskId: string, @Res() res: Response) {
        const responseData = await this.tasksService.findById(taskId);
        if (!responseData) {
            return res.status(404).json(new ApiResponseDto(HttpStatus.NOT_FOUND, responseData, 'Task not found'));
        } else {
            return res.status(200).json(new ApiResponseDto(HttpStatus.OK, responseData, 'Get task success'));
        }
    }

    @Post()
    async createTasks(@Body(new ValidationPipe) tasksDto: TasksDto): Promise<ApiResponseDto> {
        const responseData = await this.tasksService.createTasks(tasksDto);
        if (!responseData) {
            return new ApiResponseDto(HttpStatus.BAD_REQUEST, responseData, 'Create task fail');
        } else {
            return new ApiResponseDto(HttpStatus.CREATED, responseData, 'Create task success');
        }
    }

    @Put('/:taskId')
    async updateTasks(@Body(new ValidationPipe) tasksDto: TasksDto, @Param('taskId') taskId: string, @Res() res: Response): Promise<ApiResponseDto> {
        const responseData = await this.tasksService.updateTasks(tasksDto, taskId);
        if (responseData === 'Update fail') {
            return res.status(400).json(new ApiResponseDto(HttpStatus.BAD_REQUEST, null, responseData));
        } else if (responseData === 'Task not found') {
            return res.status(404).json(new ApiResponseDto(HttpStatus.NOT_FOUND, null, responseData));
        } else {
            return res.status(200).json(new ApiResponseDto(HttpStatus.OK, null, responseData));
        }
    }

    @Delete('/:taskId')
    async deleteTasks(@Param('taskId') taskId: string, @Res() res: Response): Promise<ApiResponseDto> {
        const responseData = await this.tasksService.deleteTasks(taskId);
        if (responseData === 'Delete fail') {
            return res.status(400).json(new ApiResponseDto(HttpStatus.BAD_REQUEST, null, responseData));
        } else {
            return res.status(200).json(new ApiResponseDto(HttpStatus.OK, null, responseData));
        }
    }
}
