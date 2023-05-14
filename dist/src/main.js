"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const transform_interceptor_1 = require("./transform.interceptor");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger();
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    const port = 6667;
    await app.listen(6667);
    logger.log(`SERVER RUNNING ON PORT:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map