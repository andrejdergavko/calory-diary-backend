import { Module } from '@nestjs/common';
import { FoodEntryController } from './food-entry.controller';
import { PrismaService } from '../prisma.service';
import { FoodEntryService } from './food-entry.service';

@Module({
  controllers: [FoodEntryController],
  providers: [FoodEntryService, PrismaService],
  exports: [FoodEntryService],
})
export class FoodEntryModule {}
