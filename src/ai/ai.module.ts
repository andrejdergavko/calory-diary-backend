import { Module } from '@nestjs/common';
import { AIService } from './ai.service';
import { DeepseekProvider } from './providers/deepseek.provider';
import { OpenAIProvider } from './providers/openai.provider';

@Module({
  providers: [AIService, DeepseekProvider, OpenAIProvider],
  exports: [AIService],
})
export class AIModule {}
