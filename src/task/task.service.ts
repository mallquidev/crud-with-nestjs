import { Injectable } from "@nestjs/common";
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
        return this.prisma.task.findUnique({
            where:{
                id
            }
        })
    }

    async createTask(data:CreateTaskDTO):Promise<Task>{
        return this.prisma.task.create({
            data:data
        })
    }

    async deleteTask(id:number):Promise<Task>{
        return this.prisma.task.delete({
            where: {
                id
            }
        })
    }

    async updateTask(id:number, data:UpdateTaskDTO):Promise<Task>{
        return this.prisma.task.update({
            where:{
                id
            },
            data
        })
    }

    
}