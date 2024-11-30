import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";

@Controller('tasks')
export class TaskController{
    constructor(private readonly task: TaskService){}

    @Get()
    async getAllTasks(){
        try {
            const taskFound = this.task.getAllTasks()
            return taskFound;
        } catch (error) {
            console.log(error);
        }
    }

    @Get(':id')
    async getTaskById(@Param('id') id:string){
        try {
            const taskFound = this.task.getTaskById(Number(id))
            return taskFound
        } catch (error) {
            console.log(error);
        }
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createTask(@Body() task:CreateTaskDTO){
        try {
            const taskCreate = this.task.createTask(task)
            return taskCreate
        } catch (error) {
            console.log(error);
        }
    }

    @Put(':id')
    async updateTask(@Param('id') id:string, @Body()task:UpdateTaskDTO){
        try {
            const updateTask = this.task.updateTask(Number(id), task)
            return updateTask
        } catch (error) {
            console.log(error);
        }
    }
}