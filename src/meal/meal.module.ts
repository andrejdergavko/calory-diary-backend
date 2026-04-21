import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { PrismaService } from '../prisma.service';
import { FoodEntryService } from 'src/food-entry/food-entry.service';
import { AIModule } from 'src/ai/ai.module';

@Module({
  imports: [AIModule],
  controllers: [MealController],
  providers: [MealService, PrismaService, FoodEntryService],
  exports: [MealService],
})
export class MealModule {}
