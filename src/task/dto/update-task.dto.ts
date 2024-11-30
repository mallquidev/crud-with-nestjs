import { IsString, MinLength } from "class-validator"

export class UpdateTaskDTO{
    @IsString()
    @MinLength(1)
    title: string

    @IsString()
    @MinLength(5)
    description: string
}