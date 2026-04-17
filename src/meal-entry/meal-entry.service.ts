import { Injectable, Logger } from '@nestjs/common';
import type { MealEntry } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';
// import { SetMealEntryDto } from './dto/set-meal-entry.dto';

@Injectable()
export class MealEntryService {
  private readonly logger = new Logger(MealEntryService.name);

  constructor(private readonly prisma: PrismaService) {}

  getMealEntries(): Promise<MealEntry[]> {
    this.logger.log(`Fetching meal entries for user ${1}`);

    const mealEntries = this.prisma.mealEntry.findMany({
      where: { userId: 1 },
      orderBy: { loggedAt: 'desc' },
      include: {
        foods: true,
      },
    });

    return mealEntries;
  }

  // async setMealEntry(dto: SetMealEntryDto): Promise<MealEntry> {
  //   this.logger.log(
  //     `Setting meal entry for user ${dto.userId} at ${dto.loggedAt}`,
  //   );

  //   const mealEntry = await this.prisma.mealEntry.create({
  //     data: {
  //       userId: dto.userId,
  //       mealType: dto.mealType,
  //       loggedAt: new Date(dto.loggedAt),
  //       foods: {
  //         create: dto.foods.map((food) => ({
  //           name: food.name,
  //           quantity: food.quantity,
  //           calories: food.calories,
  //           protein: food.protein,
  //           fat: food.fat,
  //           carbs: food.carbs,
  //         })),
  //       },
  //     },
  //     include: {
  //       foods: true,
  //     },
  //   });

  //   return mealEntry;
  // }
}
