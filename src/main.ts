import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpResponseInterceptor } from './interceptor/response/response.interceptor';
import { HttpFilterFilter } from './filter/http-filter/http-filter.filter';
import { PiTestPipe } from './pipe/pi-test/pi-test.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useGlobalFilters(new HttpFilterFilter());
  app.useGlobalPipes(new PiTestPipe());

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('SMegalo接口文档')
    .setDescription('描述，。。。')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
