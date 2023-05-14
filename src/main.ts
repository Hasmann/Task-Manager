import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  //types of loggers
  //.log()// logs normel messages like console.log
  //.warning()//can be used for logging warnings
  //.error()// can be used to log normal errors usually in try catch
  //.verbose()//can be used to log normal verbose data
  app.useGlobalInterceptors(new TransformInterceptor());
  const port: number = 6667;
  await app.listen(6667);
  logger.log(`SERVER RUNNING ON PORT:${port}`);
}
bootstrap();
