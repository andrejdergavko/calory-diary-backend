import { Body, Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { FoodEntryService } from './food-entry.service';

@Controller('food-entry')
export class FoodEntryController {
  constructor(private readonly foodEntryService: FoodEntryService) {}

  @Delete(':id')
  deleteFoodEntry(@Param('id', ParseIntPipe) id: number) {
    return this.foodEntryService.deleteFoodEntry(id);
  }
}
