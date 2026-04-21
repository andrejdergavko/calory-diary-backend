import { FoodEntry } from '../../generated/prisma/client';
import { AIModelName, ProcessedFoodEntry } from '../ai.types';

export interface AIModelProvider {
  readonly name: AIModelName;

  processMeal(
    text: string,
    todayFoods: FoodEntry[],
  ): Promise<ProcessedFoodEntry[]>;
}
