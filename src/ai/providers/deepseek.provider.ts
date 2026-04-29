import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { FoodEntry } from '../../generated/prisma/client';
import { AIModelName } from '../ai.types';
import { PROCESS_MEAL_ENTRY_INSTRUCTION } from '../instructions/process-meal-entry-instruction';
import { buildTodayFoodsContext } from './provider.utils';
import { AIModelProvider } from './ai-model-provider';
import { PROCESS_MEAL_ENTRY_RESPONSE_SCHEMA } from '../schemas/process-meal-entry-schema';
import { AIProcessedFoodEntry } from './providers.types';

@Injectable()
export class DeepseekProvider implements AIModelProvider {
  readonly name: AIModelName = 'deepseek';

  private readonly logger = new Logger(DeepseekProvider.name);
  private readonly client: OpenAI;

  constructor() {
    const deepseekKey = process.env.DEEPSEEK_API_KEY;
    if (!deepseekKey) {
      this.logger.error('Deepseek API key is not set');
    }

    this.client = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: deepseekKey,
    });
  }

  async processMeal(
    text: string,
    todayFoods: FoodEntry[],
  ): Promise<AIProcessedFoodEntry[]> {
    const completion = await this.client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: PROCESS_MEAL_ENTRY_INSTRUCTION,
        },
        {
          role: 'user',
          content: `Обработай запись: ${text}\n\n${buildTodayFoodsContext(todayFoods)}`,
        },
      ],
      model: 'deepseek-chat',
      response_format: { type: 'json_object' },
    });

    const rawContent = completion.choices[0].message.content ?? '';
    const result = PROCESS_MEAL_ENTRY_RESPONSE_SCHEMA.safeParse(
      JSON.parse(rawContent || '{}'),
    );

    if (!result.success) {
      this.logger.warn('Received unsupported Deepseek response', rawContent);
      throw new Error('Invalid response from Deepseek');
    }

    return result.data.foodEntries;
  }
}
