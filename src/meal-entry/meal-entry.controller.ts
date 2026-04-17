import { Body, Controller, Get, Post } from '@nestjs/common';
import { MealEntryService } from './meal-entry.service';
import { ProcessMealEntryDto } from './dto/process-meal-entry.dto';

@Controller('meal-entry')
export class MealEntryController {
  constructor(private readonly mealEntryService: MealEntryService) {}

  @Get()
  async getMealEntries() {
    return this.mealEntryService.getMealEntries();
  }

  @Post('process')
  async processMealEntry(@Body() payload: ProcessMealEntryDto) {
    return this.mealEntryService.processMealEntry(payload);
  }
}
