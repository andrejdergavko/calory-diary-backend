import { Module } from '@nestjs/common';
import { MealEntryService } from './meal-entry.service';
import { MealEntryController } from './meal-entry.controller';
import { PrismaService } from '../prisma.service';
import { MealEntryFoodService } from 'src/meal-entry-food/meal-entry-food.service';
import { AIService } from 'src/ai/ai.service';

@Module({
  controllers: [MealEntryController],
  providers: [MealEntryService, PrismaService, MealEntryFoodService, AIService],
  exports: [MealEntryService],
})
export class MealEntryModule {}
