import { Injectable, Logger } from '@nestjs/common';
import { FoodEntry } from '../generated/prisma/client';
import { ProcessedFoodEntry } from './ai.types';
import { ConfigService } from '@nestjs/config';
import { AIModelProvider } from './providers/ai-model-provider';
import { AIModelName } from './ai.types';
import { DeepseekProvider } from './providers/deepseek.provider';
import { OpenAIProvider } from './providers/openai.provider';

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private readonly provider: AIModelProvider;

  constructor(
    private readonly config: ConfigService,
    private readonly deepseekProvider: DeepseekProvider,
    private readonly openAIProvider: OpenAIProvider,
  ) {
    const configuredProvider =
      (this.config.get<AIModelName>('AI_PROVIDER') ?? 'deepseek') || 'deepseek';

    const providers: Record<AIModelName, AIModelProvider> = {
      deepseek: deepseekProvider,
      openai: openAIProvider,
    };

    this.provider = providers[configuredProvider] ?? deepseekProvider;

    if (!providers[configuredProvider]) {
      this.logger.warn(
        `Не удалось найти провайдера ${configuredProvider}, используется Deepseek`,
      );
    } else if (this.provider.name !== configuredProvider) {
      this.logger.log(`AI-provider switched to ${this.provider.name}`);
    }
  }

  async processMeal(
    text: string,
    todayFoods: FoodEntry[],
  ): Promise<ProcessedFoodEntry[]> {
    return this.provider.processMeal(text, todayFoods);
  }
}
