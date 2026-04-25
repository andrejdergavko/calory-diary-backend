import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SetMacroTargetDto } from './dto/set-macro-target.dto';
import { MacroTarget } from 'src/generated/prisma/client';

@Injectable()
export class MacroTargetsService {
  private readonly defaultUserId = 1;

  constructor(private readonly prisma: PrismaService) {}

  async getMacroTargets(
    userId = this.defaultUserId,
  ): Promise<MacroTarget | null> {
    const macroTarget = await this.prisma.macroTarget.findUnique({
      where: { userId },
    });

    if (!macroTarget) {
      return null;
    }

    return macroTarget;
  }

  async setMacroTargets(
    dto: SetMacroTargetDto,
    userId = this.defaultUserId,
  ): Promise<MacroTarget> {
    const { calories, protein, fat, carbs } = dto;

    return this.prisma.macroTarget.upsert({
      where: { userId },
      create: { userId, calories, protein, fat, carbs },
      update: { calories, protein, fat, carbs },
    });
  }
}
