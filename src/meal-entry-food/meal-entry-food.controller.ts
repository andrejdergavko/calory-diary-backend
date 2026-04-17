import { Body, Controller } from '@nestjs/common';
import { MealEntryFoodService } from './meal-entry-food.service';
// import { ProcessMealEntryDto } from './dto/process-meal-entry.dto';

@Controller('meal-entry-food')
export class MealEntryFoodController {
  constructor(private readonly mealEntryFoodService: MealEntryFoodService) {}

  // @Get()
  // async getMealEntries() {
  //   return this.mealEntryService.getMealEntries();
  // }

  // @Post('process')
  // async processMealEntry(@Body() payload: ProcessMealEntryDto) {
  //   return this.mealEntryService.processMealEntry(payload);
  // }
}
