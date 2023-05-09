import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './resource/test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './resource/user/user.module';
import { PhotoModule } from './resource/photo/photo.module';
import { Photo } from './resource/photo/entities/photo.entity';
import { Test } from './resource/test/entities/test.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '511871901',
      database: 'demo',
      entities: [Test, Photo],
      synchronize: true, // 确保每次运行应用程序时实体都将与数据库同步
    }),
    TestModule,
    UserModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
