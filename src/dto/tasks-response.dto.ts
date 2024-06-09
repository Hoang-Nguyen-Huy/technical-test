import { Expose } from "class-transformer";

export class TasksResponseDto {
    @Expose()
    taskId: string;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    status: string;
}