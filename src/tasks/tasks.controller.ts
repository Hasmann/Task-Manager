import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksDto, queryDto } from './dto';
import { Task } from './task.entity';
import { Request, query } from 'express';
import { statusValidation } from './Pipes/index';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/custom-decorator/getUser.decorator';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger();
  constructor(
    private tasksService: TasksService,
    private config: ConfigService,
  ) {
    console.log(config.get('USERNAME_DB'));
  }

  @Post()
  @UsePipes(ValidationPipe)
  setTask(@Body() body: TasksDto, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(
      `This is what the Task Dto is supppose to look like ${TasksDto}`,
    );
    return this.tasksService.setTask(body, user);
  }
  @Get('/:id')
  findSingleTask(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.findSingleTask(id, user);
  }

  @Delete('/:id')
  deleteSingleTask(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.deleteSingleTask(id, user);
  }

  @Patch('/update/:id')
  updateStatus(
    @Body(statusValidation) body,
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, body.status, user);
  }

  @Get()
  taskSearchAndFilter(
    @Query(ValidationPipe) query: queryDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `This is what the query Dto is supppose to look like ${queryDto} and the user here has the email of ${user.email}`,
    );
    return this.tasksService.taskSearchAndFilter(query, user);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // setTask(@Body() body: Task): TasksDto {
  //   return this.tasksService.setTask(body.title, body.description);
  // }

  // @Delete('/:id')
  // deleteSingleTask(@Param('id') id: string) {
  //   return this.tasksService.deleteSingleTask(id);
  // }
  // @Patch('/update/:id')
  // updateStatus(
  //   @Body(statusValidation) body,
  //   @Param('id') id: string,
  // ): TasksDto {
  //   return this.tasksService.updateStatus(id, body.status);
  // }
}
