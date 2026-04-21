import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealModule } from './meal/meal.module';
import { AIModule } from './ai/ai.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { FoodEntryModule } from './food-entry/food-entry.module';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MealModule,
    FoodEntryModule,
    AIModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Подключаем middleware для логирования ко всем маршрутам
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
