import z from 'zod';

export const PROCESS_MEAL_ENTRY_SCHEMA = {
  type: 'object',
  properties: {
    foods: {
      type: 'array',
      description: 'Nutrition breakdown for each food item',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name of the food',
          },
          quantity: {
            type: 'number',
            description: 'Quantity of the food in grams',
          },
          calories: {
            type: 'number',
            description: 'Total calories for the item in calories',
          },
          protein: {
            type: ['number'],
            description: 'Sum of protein values in grams',
          },
          fat: {
            type: ['number'],
            description: 'Sum of fat values in grams',
          },
          carbs: {
            type: ['number'],
            description: 'Sum of carb values in grams',
          },
        },
        required: ['name', 'quantity', 'calories', 'protein', 'fat', 'carbs'],
        additionalProperties: false,
      },
    },
  },
  required: ['foods'],
  additionalProperties: false,
};

export const PROCESS_MEAL_ENTRY_RESPONSE_SCHEMA = z.object({
  foods: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      calories: z.number(),
      protein: z.number(),
      fat: z.number(),
      carbs: z.number(),
    }),
  ),
});
