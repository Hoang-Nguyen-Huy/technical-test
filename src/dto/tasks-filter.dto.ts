import { ApiProperty } from "@nestjs/swagger";
import { BaseFilterDto } from "../utils/base-filter.dto";

export class TaskFilterDto extends BaseFilterDto {
    @ApiProperty()
    status: string;
}