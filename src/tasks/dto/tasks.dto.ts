import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';
export class TasksDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
export class queryDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
  @IsOptional()
  @IsNotEmpty()
  @IsIn(['OPEN', 'CLOSED', 'IN_PROGRESS'])
  filter: string;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}
