import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FoodEntryService } from './food-entry.service';

@Controller('food-entry')
export class FoodEntryController {
  constructor(private readonly foodEntryService: FoodEntryService) {}

  @Get('today')
  getFoodEntriesForToday() {
    return this.foodEntryService.getFoodEntrysForToday();
  }

  @Delete(':id')
  deleteFoodEntry(@Param('id', ParseIntPipe) id: number) {
    return this.foodEntryService.deleteFoodEntry(id);
  }
}
