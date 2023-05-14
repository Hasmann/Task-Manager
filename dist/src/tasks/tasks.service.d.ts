import { Task } from './task.entity';
import { TasksDto } from './dto';
import { Repository } from 'typeorm';
import { TaskStatus, queryDto } from './dto';
import { User } from 'src/auth/user.entity';
export declare class TasksService {
    private TaskRepo;
    private logger;
    constructor(TaskRepo: Repository<Task>);
    setTask(task: TasksDto, user: User): Promise<Task>;
    findSingleTask(id: string, user: User): Promise<Task>;
    deleteSingleTask(id: string, user: User): Promise<string>;
    updateStatus(id: string, status: TaskStatus, user: User): Promise<Task>;
    taskSearchAndFilter(query: queryDto, user: User): Promise<Task[]>;
}
