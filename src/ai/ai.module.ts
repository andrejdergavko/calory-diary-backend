import { Module } from '@nestjs/common';
import { AIService } from './ai.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [],
  providers: [AIService, PrismaService],
  exports: [AIService],
})
export class AIModule {}
