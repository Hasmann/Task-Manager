"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusValidation = void 0;
const common_1 = require("@nestjs/common");
class statusValidation {
    constructor() {
        this.allowedTasks = ['OPEN', 'CLOSED', 'IN_PROGRESS'];
    }
    transform(value) {
        console.log(value);
        value = value.status.toUpperCase();
        const check = this.checkAllowed(value);
        if (!check) {
            throw new common_1.BadRequestException(`THE VALUE OF ${value} IS NOT AN ALLOWED VALUE`);
        }
        return { status: `${value}` };
    }
    checkAllowed(value) {
        if (this.allowedTasks.includes(value)) {
            return true;
        }
        return false;
    }
}
exports.statusValidation = statusValidation;
//# sourceMappingURL=pipeTrandform.pipe.js.map