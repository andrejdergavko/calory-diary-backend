import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { PrismaService } from '../prisma.service';
import { FoodEntryService } from 'src/food-entry/food-entry.service';
import { AIService } from 'src/ai/ai.service';

@Module({
  controllers: [MealController],
  providers: [MealService, PrismaService, FoodEntryService, AIService],
  exports: [MealService],
})
export class MealModule {}
