import { FoodEntry } from '../../generated/prisma/client';
import { AIModelName } from '../ai.types';
import { AIProcessedFoodEntry } from './providers.types';

export interface AIModelProvider {
  readonly name: AIModelName;

  processMeal(
    text: string,
    todayFoods: FoodEntry[],
  ): Promise<AIProcessedFoodEntry[]>;
}
