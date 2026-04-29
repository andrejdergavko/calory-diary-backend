export interface ProcessedFood {
  name: string;
  proteinPer100g: number;
  fatPer100g: number;
  carbsPer100g: number;
}
export interface ProcessedFoodEntry {
  food: ProcessedFood;
  weight: number;
}

export type AIModelName = 'deepseek' | 'openai';
