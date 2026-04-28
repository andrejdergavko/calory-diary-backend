export const calculateCalories = (
  protein: number,
  fat: number,
  carbs: number,
) => {
  return protein * 4 + fat * 9 + carbs * 4;
};
