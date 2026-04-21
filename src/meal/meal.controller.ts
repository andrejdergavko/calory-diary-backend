import { Body, Controller, Get, Post } from '@nestjs/common';
import { MealService } from './meal.service';
import { ProcessMealDto } from './dto/process-meal.dto';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Get()
  async getMealEntries() {
    return this.mealService.getMealEntries();
  }

  @Post('process')
  async processMeal(@Body() payload: ProcessMealDto) {
    return this.mealService.processMeal(payload);
  }
}
