import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from 'src/entities/tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  exports: [TypeOrmModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
