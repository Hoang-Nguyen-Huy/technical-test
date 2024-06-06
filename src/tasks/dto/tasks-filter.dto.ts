import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { BaseFilterDto } from "src/utils/base-filter.dto";

export class TaskFilterDto extends BaseFilterDto {
    @ApiProperty()
    status: string;
}