"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const task_entity_1 = require("./task.entity");
const typeorm_1 = require("typeorm");
const dto_1 = require("./dto");
const typeorm_2 = require("@nestjs/typeorm");
let TasksService = class TasksService {
    constructor(TaskRepo) {
        this.TaskRepo = TaskRepo;
        this.logger = new common_1.Logger();
    }
    async setTask(task, user) {
        const { title, description } = task;
        const createdTask = this.TaskRepo.create({
            title,
            description,
            status: dto_1.TaskStatus.OPEN,
            user,
        });
        try {
            await this.TaskRepo.save(createdTask);
            return createdTask;
        }
        catch (error) {
            this.logger.error(`Failed to Create a Task Attached To user of details ${user}`, true);
            throw new common_1.InternalServerErrorException();
        }
    }
    async findSingleTask(id, user) {
        const singleTask = await this.TaskRepo.findOneBy({
            id: id,
            user,
        });
        if (!singleTask) {
            throw new common_1.NotFoundException('This Task Does Not Exist!!');
        }
        return singleTask;
    }
    async deleteSingleTask(id, user) {
        const deleted = await this.TaskRepo.delete({ id: id, user });
        if (!deleted) {
            throw new common_1.NotFoundException('THIS HAS FAILED TO DELETE!!');
        }
        return 'Deleted Successfully';
    }
    async updateStatus(id, status, user) {
        const findTask = await this.TaskRepo.findOneBy({ id: id, user });
        if (findTask) {
            findTask.status = status;
            const updated = await this.TaskRepo.save(findTask);
            if (!updated) {
                throw new common_1.NotImplementedException('This Failed To Update');
            }
            return updated;
        }
        throw new common_1.NotFoundException('THIS HAS FAILED TO DELETE!!');
    }
    async taskSearchAndFilter(query, user) {
        const { filter, search } = query;
        const myquery = this.TaskRepo.createQueryBuilder('task');
        myquery.where({ user });
        if (filter) {
            myquery.andWhere('task.status=:filter', { filter });
        }
        if (search) {
            myquery.andWhere('(LOWER(task.title) LIKE : LOWER(search) OR LOWER(task.description) LIKE :LOWER(search))', { search: `%${search}%` });
        }
        const tasks = await myquery.getMany();
        return tasks;
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map