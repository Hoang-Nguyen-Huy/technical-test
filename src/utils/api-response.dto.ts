import { ApiProperty } from "@nestjs/swagger";

 export class ApiResponseDto<T = any> {
    @ApiProperty({ required: false })
    message?: string | string[];

    @ApiProperty()
    data?: T | T[];

    @ApiProperty()
    statusCode?: Number;

    constructor(
        statusCode?: Number,
        data?: T | T[],
        message?: string | string[]
    ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    };
 }