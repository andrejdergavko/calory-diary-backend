import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { MacroTargetsController } from './macro-targets.controller';
import { MacroTargetsService } from './macro-targets.service';

@Module({
  controllers: [MacroTargetsController],
  providers: [MacroTargetsService, PrismaService],
  exports: [MacroTargetsService],
})
export class MacroTargetsModule {}
