import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { TestJobData } from '../dto/test-job.dto';

@Injectable()
export class TestQueueService {
  private readonly logger = new Logger(TestQueueService.name);

  constructor(@InjectQueue('test-queue') private testQueue: Queue) {}

  async addTestJob(data: TestJobData): Promise<void> {
    try {
      const job = await this.testQueue.add('test-job', data, {
        delay: 0,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      });

      this.logger.log(`📝 Job added to queue. Job ID: ${job.id}`);
    } catch (error) {
      this.logger.error('Error adding job to queue:', error);
      throw error;
    }
  }

  async getQueueStatus(): Promise<{
    waitingCount: number;
    activeCount: number;
    completedCount: number;
    failedCount: number;
  }> {
    const [waitingCount, activeCount, completedCount, failedCount] =
      await Promise.all([
        this.testQueue.getWaitingCount(),
        this.testQueue.getActiveCount(),
        this.testQueue.getCompletedCount(),
        this.testQueue.getFailedCount(),
      ]);

    return {
      waitingCount,
      activeCount,
      completedCount,
      failedCount,
    };
  }
}
