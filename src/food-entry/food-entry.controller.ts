import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { FoodEntryService } from './food-entry.service';
import type { FoodEntry } from 'src/generated/prisma/client';

@Controller('food-entry')
export class FoodEntryController {
  constructor(private readonly foodEntryService: FoodEntryService) {}

  @Get('today')
  getFoodEntriesForToday() {
    return this.foodEntryService.getFoodEntrysForToday();
  }

  @Put(':id')
  editFoodEntry(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: FoodEntry,
  ): Promise<FoodEntry> {
    return this.foodEntryService.editFoodEntry(id, payload);
  }

  @Delete(':id')
  deleteFoodEntry(@Param('id', ParseIntPipe) id: number) {
    return this.foodEntryService.deleteFoodEntry(id);
  }
}
