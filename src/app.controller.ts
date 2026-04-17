import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SchedulerRegistry } from '@nestjs/schedule';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Get('health')
  getHealth() {
    this.schedulerRegistry.getCronJob('my-cron-job-1').stop();

    return this.appService.getHealth();
  }
}
