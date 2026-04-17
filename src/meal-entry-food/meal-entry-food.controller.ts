import { Body, Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { MealEntryFoodService } from './meal-entry-food.service';

@Controller('meal-entry-food')
export class MealEntryFoodController {
  constructor(private readonly mealEntryFoodService: MealEntryFoodService) {}

  @Delete(':id')
  deleteMealEntryFood(@Param('id', ParseIntPipe) id: number) {
    return this.mealEntryFoodService.deleteMealEntryFood(id);
  }
}
