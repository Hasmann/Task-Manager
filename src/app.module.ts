import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
// import { ScheduleModule } from '@nestjs/schedule';
// import { CronjobsModule } from './cronjobs/cronjobs.module';
// add to imports for cron job ScheduleModule.forRoot(), CronjobsModule
//typeOrm Module used for typeOrm connection for postgres
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './../configValidation/index';

@Module({
  imports: [
    TasksModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.stage.dev'],
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('HOST'),
        port: config.get('PORT'),
        username: config.get('USERNAME_DB'),
        password: config.get('PASSWORD'),
        database: config.get('DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class AppModule {}
