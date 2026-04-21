import { FoodEntry } from '../../generated/prisma/client';

export function buildTodayFoodsContext(todayFoods: FoodEntry[]): string {
  if (!todayFoods.length) {
    return 'Сегодня ранее ничего не съедено.';
  }

  return `Сегодня ранее съедено:\n${JSON.stringify(todayFoods, null, 2)}`;
}
