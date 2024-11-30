import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";

@Injectable()
export class TaskService{
    constructor(private prisma: PrismaService){}

    async getAllTasks():Promise<Task[]>{
        return this.prisma.task.findMany()
    }

    async getTaskById(id:number):Promise<Task>{
        const task = await this.prisma.task.findUnique({
            where: { id },
        });
      
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
      
        return task;
    }

    async createTask(data:CreateTaskDTO):Promise<Task>{
        return this.prisma.task.create({
            data:data
        })
    }

    async deleteTask(id:number):Promise<Boolean>{
        try {
            await this.prisma.task.delete({
              where: { id },
            });
      
            return true;
        }catch (error) {
            return false;
        }
        
    }

    async updateTask(id:number, data:UpdateTaskDTO):Promise<Task>{
        const taskExist = await this.prisma.task.findUnique({
            where:{id}
            
        });
        if(!taskExist) {
            throw new NotFoundException(`Task with ID ${id} not found`)
        }

        const updateTask = await this.prisma.task.update({
            where:{
                id
            }, data
        })

        return updateTask
    
    }

    
}