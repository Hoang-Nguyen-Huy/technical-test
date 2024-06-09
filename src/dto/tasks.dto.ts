import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Status } from "../enum/status.enum";

export class TasksDto {
    @ApiProperty({
        example: 'Test'
    })
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: 'Test tasks'
    })
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        example: 'incompleted'
    })
    status?: Status;
}