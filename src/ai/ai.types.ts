export interface ProcessedFoodEntry {
  name: string;
  weight: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export type AIModelName = 'deepseek' | 'openai';
