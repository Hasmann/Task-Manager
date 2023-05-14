import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  HOST: Joi.string().required(),
  PORT: Joi.number().default(5432).required(),
  USERNAME_DB: Joi.string().required(),
  PASSWORD: Joi.string().required(),
  DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
