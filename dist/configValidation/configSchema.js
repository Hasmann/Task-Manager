"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configValidationSchema = void 0;
const Joi = require("@hapi/joi");
exports.configValidationSchema = Joi.object({
    HOST: Joi.string().required(),
    PORT: Joi.number().default(5432).required(),
    USERNAME_DB: Joi.string().required(),
    PASSWORD: Joi.string().required(),
    DATABASE: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
});
//# sourceMappingURL=configSchema.js.map