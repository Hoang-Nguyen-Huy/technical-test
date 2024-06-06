import { Body, Controller, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TasksDto } from './dto/tasks.dto';
import { TasksService } from './tasks.service';
import { ApiResponseDto } from 'src/utils/api-response.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService
    ) {};
    @Post()
    async createTasks(@Body(new ValidationPipe) tasksDto: TasksDto): Promise<ApiResponseDto> {
        const responseData = await this.tasksService.createTasks(tasksDto);
        if (!responseData) {
            return new ApiResponseDto(HttpStatus.BAD_REQUEST, responseData, 'Create task fail');
        } else {
            return new ApiResponseDto(HttpStatus.CREATED, responseData, 'Create task success');
        }
    }
}
