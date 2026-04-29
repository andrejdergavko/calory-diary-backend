export interface AIProcessedFood {
  name: string;
  proteinPer100g: number;
  fatPer100g: number;
  carbsPer100g: number;
}

export interface AIProcessedFoodEntry {
  food: AIProcessedFood;
  weightInGrams: number;
}
