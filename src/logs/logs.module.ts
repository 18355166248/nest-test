import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  WinstonModule,
  WinstonModuleOptions,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { LOG_ENUM } from 'src/enum/config.enum';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const consoleTransports = new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('SMegalo', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        });
        const consoleErrorTransports = new winston.transports.Console({
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('SMegalo', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        });
        const dailyWarnTransports = new winston.transports.DailyRotateFile({
          level: 'warn',
          dirname: 'logs',
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple(),
          ),
        });
        const dailyInfoTransports = new winston.transports.DailyRotateFile({
          level: 'info',
          dirname: 'logs',
          filename: 'info-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple(),
          ),
        });
        return {
          transports: [
            consoleTransports,
            consoleErrorTransports,
            ...(configService.get(LOG_ENUM.LOG_ON)
              ? [dailyWarnTransports, dailyInfoTransports]
              : []),
          ],
        } as WinstonModuleOptions;
      },
      inject: [ConfigService],
    }),
  ],
})
export class LogsModule {}
