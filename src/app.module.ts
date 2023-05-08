import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './resource/test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './resource/test/entities/test.entity';

@Module({
  imports: [
    TestModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '511871901',
      database: 'demo',
      entities: [Test],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
