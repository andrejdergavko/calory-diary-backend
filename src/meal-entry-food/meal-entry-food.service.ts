import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MealEntryFood } from 'src/generated/prisma/client';
import { getDayBounds } from 'src/common/utils';

@Injectable()
export class MealEntryFoodService {
  private readonly logger = new Logger(MealEntryFoodService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getMealEntryFoodsForToday(): Promise<MealEntryFood[]> {
    const { start, end } = getDayBounds(0);

    const mealEntryFoods = await this.prisma.mealEntryFood.findMany({
      where: {
        mealEntry: {
          loggedAt: {
            gte: start,
            lt: end,
          },
        },
      },
    });

    return mealEntryFoods;
  }
}
