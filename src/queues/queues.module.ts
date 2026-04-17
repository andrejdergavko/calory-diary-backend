import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TestQueueProcessor } from './processors/test-queue.processor';
import { TestQueueService } from './services/test-queue.service';
import { QueuesController } from './queues.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'test-queue',
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      },
    }),
  ],
  providers: [TestQueueProcessor, TestQueueService],
  exports: [TestQueueService],
  controllers: [QueuesController],
})
export class QueuesModule {}
