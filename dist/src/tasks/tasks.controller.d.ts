import { TasksService } from './tasks.service';
import { TasksDto, queryDto } from './dto';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { ConfigService } from '@nestjs/config';
export declare class TasksController {
    private tasksService;
    private config;
    private logger;
    constructor(tasksService: TasksService, config: ConfigService);
    setTask(body: TasksDto, user: User): Promise<Task>;
    findSingleTask(id: string, user: User): Promise<Task>;
    deleteSingleTask(id: string, user: User): Promise<string>;
    updateStatus(body: any, id: string, user: User): Promise<Task>;
    taskSearchAndFilter(query: queryDto, user: User): Promise<Task[]>;
}
