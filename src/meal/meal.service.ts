import { Injectable, Logger } from '@nestjs/common';
import { MealType, type Meal } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';
import { ProcessMealDto } from './dto/process-meal.dto';
import { FoodEntryService } from 'src/food-entry/food-entry.service';
import { AIService } from 'src/ai/ai.service';

@Injectable()
export class MealService {
  private readonly logger = new Logger(MealService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly foodEntryService: FoodEntryService,
    private readonly aiService: AIService,
  ) {}

  getMealEntries(): Promise<Meal[]> {
    const mealEntries = this.prisma.meal.findMany({
      where: { userId: 1 },
      orderBy: { loggedAt: 'desc' },
      include: {
        foods: true,
      },
    });

    return mealEntries;
  }

  async processMeal(payload: ProcessMealDto): Promise<Meal> {
    const todayFoods = await this.foodEntryService.getFoodEntrysForToday();

    const aiResponse = await this.aiService.processMeal(
      payload.text,
      todayFoods,
    );

    const meal = await this.prisma.meal.create({
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

    return meal;
  }
}
