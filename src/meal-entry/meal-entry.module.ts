import { Module } from '@nestjs/common';
import { MealEntryService } from './meal-entry.service';
import { MealEntryController } from './meal-entry.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MealEntryController],
  providers: [MealEntryService, PrismaService],
  exports: [MealEntryService],
})
export class MealEntryModule {}
