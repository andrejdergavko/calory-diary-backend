import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/global-http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });

  // Регистрируем глобальный фильтр для обработки HTTP исключений
  app.useGlobalFilters(new HttpExceptionFilter());

  // Глобальная валидация для всех DTO
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: удаляет из объекта все поля, которые не описаны в DTO
      // Пример: если фронт пришлет { email, name, hack: "data" } → { email, name }
      whitelist: true,

      // forbidNonWhitelisted: выбрасывает ошибку, если есть неизвестные поля
      // Вместо молчаливого удаления, будет ошибка 400
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
