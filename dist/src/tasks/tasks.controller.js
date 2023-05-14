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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const dto_1 = require("./dto");
const index_1 = require("./Pipes/index");
const passport_1 = require("@nestjs/passport");
const getUser_decorator_1 = require("../auth/custom-decorator/getUser.decorator");
const user_entity_1 = require("../auth/user.entity");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let TasksController = class TasksController {
    constructor(tasksService, config) {
        this.tasksService = tasksService;
        this.config = config;
        this.logger = new common_2.Logger();
        console.log(config.get('USERNAME_DB'));
    }
    setTask(body, user) {
        this.logger.verbose(`This is what the Task Dto is supppose to look like ${dto_1.TasksDto}`);
        return this.tasksService.setTask(body, user);
    }
    findSingleTask(id, user) {
        return this.tasksService.findSingleTask(id, user);
    }
    deleteSingleTask(id, user) {
        return this.tasksService.deleteSingleTask(id, user);
    }
    updateStatus(body, id, user) {
        return this.tasksService.updateStatus(id, body.status, user);
    }
    taskSearchAndFilter(query, user) {
        this.logger.verbose(`This is what the query Dto is supppose to look like ${dto_1.queryDto} and the user here has the email of ${user.email}`);
        return this.tasksService.taskSearchAndFilter(query, user);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TasksDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "setTask", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findSingleTask", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "deleteSingleTask", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Body)(index_1.statusValidation)),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(common_1.ValidationPipe)),
    __param(1, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.queryDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "taskSearchAndFilter", null);
TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [tasks_service_1.TasksService,
        config_1.ConfigService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map