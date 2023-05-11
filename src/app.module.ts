import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './resource/test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './resource/user/user.module';
import { PhotoModule } from './resource/photo/photo.module';
import { Photo } from './resource/photo/entities/photo.entity';
import { Test } from './resource/test/entities/test.entity';
import { One1Module } from './resource/one1/one1.module';
import { One2Module } from './resource/one2/one2.module';
import { One1 } from './resource/one1/entities/one1.entity';
import { One2 } from './resource/one2/entities/one2.entity';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '511871901',
      database: 'demo',
      entities: [Test, Photo, One1, One2],
      synchronize: true, // 确保每次运行应用程序时实体都将与数据库同步
    }),
    TestModule,
    UserModule,
    PhotoModule,
    One1Module, // 一对一
    One2Module, // 一对一
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
