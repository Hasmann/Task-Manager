import { Repository } from 'typeorm';
import { Task } from './task.entity';
export declare class TaskRepository {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
}
