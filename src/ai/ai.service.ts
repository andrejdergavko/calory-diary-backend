import { Injectable, Logger } from '@nestjs/common';
import type { MealEntryFood } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';
import { ProcessedMealEntryFood } from './ai.types';
import OpenAI from 'openai';
import { PROCESS_MEAL_ENTRY_INSTRUCTION } from './instructions/process-meal-entry-instruction';
import {
  PROCESS_MEAL_ENTRY_RESPONSE_SCHEMA,
  PROCESS_MEAL_ENTRY_SCHEMA,
} from './schemas/process-meal-entry-schema';

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private readonly client: OpenAI;

  constructor(private readonly prisma: PrismaService) {
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async processMealEntry(
    text: string,
    todayFoods: MealEntryFood[],
  ): Promise<ProcessedMealEntryFood[]> {
    const todayFoodsContext =
      todayFoods.length > 0
        ? `Сегодня ранее съедено:\n${JSON.stringify(todayFoods, null, 2)}`
        : 'Сегодня ранее ничего не съедено.';

    const response = await this.client.responses.create({
      model: 'gpt-5-mini',
      instructions: PROCESS_MEAL_ENTRY_INSTRUCTION,
      input: `Обработай запись: ${text}\n\n${todayFoodsContext}`,
      text: {
        format: {
          type: 'json_schema',
          name: 'processed_meal_entry_foods',
          description:
            'List of analyzed foods with quantities and macronutrients',
          strict: true,
          schema: PROCESS_MEAL_ENTRY_SCHEMA,
        },
      },
    });

    const result = PROCESS_MEAL_ENTRY_RESPONSE_SCHEMA.safeParse(
      JSON.parse(response.output_text),
    );

    if (!result.success) {
      throw new Error('Invalid response from AI model');
    }

    return result.data.foods;
  }
}
