import { Module } from '@nestjs/common';
import { MealEntryFoodController } from './meal-entry-food.controller';
import { PrismaService } from '../prisma.service';
import { MealEntryFoodService } from './meal-entry-food.service';

@Module({
  controllers: [MealEntryFoodController],
  providers: [MealEntryFoodService, PrismaService],
  exports: [MealEntryFoodService],
})
export class MealEntryFoodModule {}
