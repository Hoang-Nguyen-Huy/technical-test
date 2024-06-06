import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from 'src/entities/tasks.entity';
import { Repository } from 'typeorm';
import { TasksDto } from './dto/tasks.dto';
import { Status } from 'src/enum/status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>
    ) {};

    async createTasks(tasksDto: TasksDto) {
        tasksDto.status === Status.Completed ? Status.Completed : Status.Incompleted;
        return this.tasksRepository.save(tasksDto);
    }
}
