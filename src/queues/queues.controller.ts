import { Controller, Post, Get, Body, Logger } from '@nestjs/common';
import { TestQueueService } from './services/test-queue.service';
import { TestJobData } from './dto/test-job.dto';

@Controller('queues')
export class QueuesController {
  private readonly logger = new Logger(QueuesController.name);

  constructor(private readonly testQueueService: TestQueueService) {}

  @Post('test-job')
  async addTestJob(@Body() data: TestJobData): Promise<{ message: string }> {
    this.logger.log('📨 Received request to add test job');
    await this.testQueueService.addTestJob(data);
    return { message: 'Job added to queue successfully' };
  }

  @Get('status')
  async getQueueStatus(): Promise<{
    waitingCount: number;
    activeCount: number;
    completedCount: number;
    failedCount: number;
  }> {
    this.logger.log('📊 Fetching queue status');
    return await this.testQueueService.getQueueStatus();
  }
}
