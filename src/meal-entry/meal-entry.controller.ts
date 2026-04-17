import {
  Body,
  Controller,
  Get,
  // ParseIntPipe,
  // Post,
  // Query,
} from '@nestjs/common';
// import { SetMealEntryDto } from './dto/set-meal-entry.dto';
import { MealEntryService } from './meal-entry.service';

@Controller('meal-entry')
export class MealEntryController {
  constructor(private readonly mealEntryService: MealEntryService) {}

  @Get()
  async getMealEntries() {
    return this.mealEntryService.getMealEntries();
  }
}
