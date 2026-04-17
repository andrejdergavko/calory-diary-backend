import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealEntryModule } from './meal-entry/meal-entry.module';
import { AIModule } from './ai/ai.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { MealEntryFoodModule } from './meal-entry-food/meal-entry-food.module';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MealEntryModule,
    MealEntryFoodModule,
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
