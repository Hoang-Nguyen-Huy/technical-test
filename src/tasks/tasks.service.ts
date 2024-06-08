import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from 'src/entities/tasks.entity';
import { Repository } from 'typeorm';
import { TasksDto } from './dto/tasks.dto';
import { Status } from 'src/enum/status.enum';
import { TaskFilterDto } from './dto/tasks-filter.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>
    ) {};

    async getTasks(filter: TaskFilterDto) {
        if (filter.page < 1) {
            throw new InternalServerErrorException();
        }
        if (filter.take < 0) {
            throw new InternalServerErrorException();
        }
        const query = this.tasksRepository.createQueryBuilder('task');

        if (filter.status) {
            query.andWhere('task.status = :status', { status: filter.status });
        }

        query.skip(filter.take * (filter.page - 1))
            .take(filter.take);

        return await query.getManyAndCount();
    }

    async createTasks(tasksDto: TasksDto) {
        tasksDto.status === Status.Completed ? Status.Completed : Status.Incompleted;
        return this.tasksRepository.save(tasksDto);
    }

    async updateTasks(tasksDto: TasksDto, taskId: string): Promise<string> {
        const taskUp = await this.findById(taskId);
        if (taskUp) {
            const res = (await this.tasksRepository.update(taskId, tasksDto)).affected;
            if (res === 0) {
                return 'Update fail';
            } else {
                return 'Update success';
            }
        }
        return 'Task not found';
    }

    async deleteTasks(taskId: string): Promise<string> {
        const res = await this.tasksRepository.delete(taskId);
        if (res.affected === 0) {
            return 'Delete fail';
        }
        return 'Delete success';
    }

    async findById(taskId: string): Promise<Tasks> {
        const existTask = await this.tasksRepository.findOne({
            where: {
                taskId: taskId
            }
        });
        return existTask;
    }
}

