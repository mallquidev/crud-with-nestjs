import { IsString, Min, MinLength } from "class-validator"

export class CreateTaskDTO{
    @IsString()
    @MinLength(1)
    title: string

    @IsString()
    @MinLength(5)
    description: string
}