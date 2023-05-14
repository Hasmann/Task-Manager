import {
  Injectable,
  NotFoundException,
  NotImplementedException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TasksDto } from './dto';
import { Repository } from 'typeorm';
import { TaskStatus, queryDto } from './dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
  private logger = new Logger();
  constructor(@InjectRepository(Task) private TaskRepo: Repository<Task>) {}

  async setTask(task: TasksDto, user: User): Promise<Task> {
    const { title, description } = task;
    const createdTask = this.TaskRepo.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    try {
      await this.TaskRepo.save(createdTask);
      return createdTask;
    } catch (error) {
      this.logger.error(
        `Failed to Create a Task Attached To user of details ${user}`,
        true,
      );
      throw new InternalServerErrorException();
    }
  }

  async findSingleTask(id: string, user: User): Promise<Task> {
    const singleTask = await this.TaskRepo.findOneBy({
      id: id,
      user,
    });
    if (!singleTask) {
      throw new NotFoundException('This Task Does Not Exist!!');
    }
    return singleTask;
  }
  async deleteSingleTask(id: string, user: User) {
    const deleted = await this.TaskRepo.delete({ id: id, user });

    if (!deleted) {
      throw new NotFoundException('THIS HAS FAILED TO DELETE!!');
    }
    return 'Deleted Successfully';
  }

  async updateStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const findTask = await this.TaskRepo.findOneBy({ id: id, user });
    if (findTask) {
      findTask.status = status;
      const updated = await this.TaskRepo.save(findTask);
      if (!updated) {
        throw new NotImplementedException('This Failed To Update');
      }
      return updated;
    }
    throw new NotFoundException('THIS HAS FAILED TO DELETE!!');
  }
  async taskSearchAndFilter(query: queryDto, user: User): Promise<Task[]> {
    const { filter, search } = query;
    const myquery = this.TaskRepo.createQueryBuilder('task');
    myquery.where({ user });
    if (filter) {
      myquery.andWhere('task.status=:filter', { filter });
    }
    if (search) {
      myquery.andWhere(
        '(LOWER(task.title) LIKE : LOWER(search) OR LOWER(task.description) LIKE :LOWER(search))',
        { search: `%${search}%` },
      );
    }
    const tasks = await myquery.getMany();
    return tasks;
  }

  // private tasks: TasksDto[] = [];
  // getAllTasks(): TasksDto[] {
  //   return this.tasks;
  // }
  // setTask(title: string, description: string): TasksDto {
  //   const task: TasksDto = {
  //     id: uuidv1(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // findSingleTask(id: string): TasksDto {
  //   const singleTask = this.tasks.find((arr) => {
  //     return arr.id === id;
  //   });
  //   if (!singleTask) {
  //     throw new NotFoundException('This Task Does Not Exist!!');
  //   }
  //   return singleTask;
  // }
  // deleteSingleTask(id: string) {
  //   const index = this.tasks.findIndex((arr) => {
  //     return arr.id === id;
  //   });
  //   const deleted = this.tasks.splice(index, 1);
  //   if (!index) {
  //     throw new NotFoundException('THIS HAS FAILED TO DELETE!!');
  //   }
  //   return deleted;
  // }
  // updateStatus(id: string, status: TaskStatus): TasksDto {
  //   const index = this.tasks.findIndex((arr) => {
  //     return arr.id === id;
  //   });
  //   if (index) {
  //     this.tasks[index].status = status;
  //     return this.tasks[index];
  //   }
  //   throw new NotFoundException('THIS HAS FAILED TO DELETE!!');
  // }
  // taskSearchAndFilter(query: queryDto) {
  //   const { filter, search } = query;
  //   const filteredArray = this.tasks;
  //   if (filter) {
  //     const fa = filteredArray.filter((arr) => {
  //       return arr.status === filter;
  //     });
  //     return fa;
  //   }
  //   const fa = filteredArray.filter((arr) => {
  //     return arr.title.includes(search) || arr.description.includes(search);
  //   });
  //   return fa;
  // }
}
