import { Controller, Get } from "@nestjs/common";
import TaskService from "./task.service";

@Controller()
export class TaskController{

    constructor(private task:TaskService){}

    @Get('/xd')
    getAll(){
        return this.task.getHello()
    }
}