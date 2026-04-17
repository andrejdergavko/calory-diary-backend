import { Injectable, Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { TestJobData } from '../dto/test-job.dto';

@Processor('test-queue')
@Injectable()
export class TestQueueProcessor extends WorkerHost {
  private readonly logger = new Logger(TestQueueProcessor.name);

  async process(job: Job<TestJobData>): Promise<void> {
    try {
      this.logger.log(`✅ Processing job ${job.id}: ${job.data.message}`);
      this.logger.log(`📦 Job data:`, job.data);

      // Симуляция обработки задачи
      await this.simulateWork();

      this.logger.log(`✨ Job ${job.id} completed successfully`);
    } catch (error) {
      this.logger.error(`❌ Error processing job ${job.id}:`, error);
      throw error;
    }
  }

  private async simulateWork(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.logger.log('⚙️ Simulating some work...');
        resolve();
      }, 1000);
    });
  }
}
