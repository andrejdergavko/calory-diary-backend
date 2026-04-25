import { Body, Controller, Get, Post } from '@nestjs/common';
import { SetMacroTargetDto } from './dto/set-macro-target.dto';
import { MacroTargetsService } from './macro-targets.service';

@Controller('macro-targets')
export class MacroTargetsController {
  constructor(private readonly macroTargetsService: MacroTargetsService) {}

  @Get()
  getMacroTargets() {
    return this.macroTargetsService.getMacroTargets();
  }

  @Post()
  setMacroTargets(@Body() payload: SetMacroTargetDto) {
    return this.macroTargetsService.setMacroTargets(payload);
  }
}
