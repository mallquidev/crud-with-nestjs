import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";

@Controller('tasks')
export class TaskController{
    constructor(private readonly taskService: TaskService){}

    @Get()
    async getAllTasks(){
        
        const taskFound = await this.taskService.getAllTasks()
        return taskFound;
        
    }

    @Get(':id')
    async getTaskById(@Param('id') id:string){
        const numericId = Number(id)
        if(isNaN(numericId)){
            throw new BadRequestException('Invalid task ID format')
        }
        
        const taskFound = await this.taskService.getTaskById(Number(id))
        return taskFound;
        
            
        
 
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createTask(@Body() task:CreateTaskDTO){
        
        const taskCreate = await this.taskService.createTask(task)
        return taskCreate
        
    }

    @Delete(':id')
    async deleteTask(@Param('id') id:string){
        
        const numericId = Number(id)
        if(isNaN(numericId)){
            throw new BadRequestException('Invalid task ID format')
        }
        const deleteResult = await this.taskService.deleteTask(numericId)
        if(!deleteResult) throw new NotFoundException('TaskNotFound')
        return { message: 'Task successfully deleted', deleted: deleteResult };
        
        
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async updateTask(@Param('id') id:string, @Body()task:UpdateTaskDTO){
        const numericId = Number(id)
        if(isNaN(numericId)){
            throw new BadRequestException('Invalid task ID format')
        }
        
            
        const updatedTask = await this.taskService.updateTask(numericId, task)
        return { message: 'Task successfully updated', task: updatedTask };
        
    }
 

    
}