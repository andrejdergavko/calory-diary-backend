import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { FoodEntry } from '../../generated/prisma/client';
import { AIModelName, ProcessedFoodEntry } from '../ai.types';
import { buildTodayFoodsContext } from './provider.utils';
import { PROCESS_MEAL_ENTRY_INSTRUCTION } from '../instructions/process-meal-entry-instruction';

import { AIModelProvider } from './ai-model-provider';
import {
  PROCESS_MEAL_ENTRY_RESPONSE_SCHEMA,
  PROCESS_MEAL_ENTRY_SCHEMA,
} from '../schemas/process-meal-entry-schema';

@Injectable()
export class OpenAIProvider implements AIModelProvider {
  readonly name: AIModelName = 'openai';

  private readonly logger = new Logger(OpenAIProvider.name);
  private readonly client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async processMeal(
    text: string,
    todayFoods: FoodEntry[],
  ): Promise<ProcessedFoodEntry[]> {
    const response = await this.client.responses.create({
      model: 'gpt-5.1-mini',
      instructions: PROCESS_MEAL_ENTRY_INSTRUCTION,
      input: `Обработай запись: ${text}\n\n${buildTodayFoodsContext(todayFoods)}`,
      text: {
        format: {
          type: 'json_schema',
          name: 'processed_meal_entry_foods',
          description:
            'Список разобранных продуктов с количеством и макроэлементами',
          strict: true,
          schema: PROCESS_MEAL_ENTRY_SCHEMA,
        },
      },
    });

    const rawText = response.output_text ?? '';
    const result = PROCESS_MEAL_ENTRY_RESPONSE_SCHEMA.safeParse(
      JSON.parse(rawText || '{}'),
    );

    if (!result.success) {
      this.logger.warn('OpenAI response failed schema validation', rawText);
      throw new Error('Invalid response from OpenAI');
    }

    return result.data.foods;
  }
}
