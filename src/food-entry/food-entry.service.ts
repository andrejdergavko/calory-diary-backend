import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FoodEntry } from 'src/generated/prisma/client';
import { getDayBounds } from 'src/common/utils';

@Injectable()
export class FoodEntryService {
  private readonly logger = new Logger(FoodEntryService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getFoodEntrysForToday(): Promise<FoodEntry[]> {
    const { start, end } = getDayBounds(0);

    const foodEntrys = await this.prisma.foodEntry.findMany({
      where: {
        meal: {
          loggedAt: {
            gte: start,
            lt: end,
          },
        },
      },
    });

    return foodEntrys;
  }

  async deleteFoodEntry(id: number) {
    await this.prisma.foodEntry.delete({
      where: { id },
    });
  }
}
