import { Injectable, Logger } from '@nestjs/common';
import { MealType, type MealEntry } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';
import { ProcessMealEntryDto } from './dto/process-meal-entry.dto';
import { MealEntryFoodService } from 'src/meal-entry-food/meal-entry-food.service';
import { AIService } from 'src/ai/ai.service';

@Injectable()
export class MealEntryService {
  private readonly logger = new Logger(MealEntryService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mealEntryFoodService: MealEntryFoodService,
    private readonly aiService: AIService,
  ) {}

  getMealEntries(): Promise<MealEntry[]> {
    const mealEntries = this.prisma.mealEntry.findMany({
      where: { userId: 1 },
      orderBy: { loggedAt: 'desc' },
      include: {
        foods: true,
      },
    });

    return mealEntries;
  }

  async processMealEntry(payload: ProcessMealEntryDto): Promise<MealEntry> {
    const todayFoods =
      await this.mealEntryFoodService.getMealEntryFoodsForToday();

    const aiResponse = await this.aiService.processMealEntry(
      payload.text,
      todayFoods,
    );

    const mealEntry = await this.prisma.mealEntry.create({
      data: {
        userId: 1,
        loggedAt: new Date(),
        mealType: MealType.BREAKFAST,
        foods: {
          create: aiResponse.map((food) => ({
            name: food.name,
            quantity: food.quantity,
            calories: food.calories,
            protein: food.protein,
            fat: food.fat,
            carbs: food.carbs,
          })),
        },
      },
    });

    return mealEntry;
  }
}
