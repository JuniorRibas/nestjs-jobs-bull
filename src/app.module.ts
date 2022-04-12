import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MiddlewareBuilder } from '@nestjs/core';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumerHellouJob } from './jobs/ConsumerHellouJob.job';
import { ConsumerHi } from './jobs/ConsumerHi.job';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        password: 'jobs',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'queue-hi',
    }),
    BullModule.registerQueue({
      name: 'hellou-queue',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConsumerHellouJob, ConsumerHi],
})
export class AppModule {
  constructor(
    @InjectQueue('hellou-queue')
    private hellouQueue: Queue,
    @InjectQueue('queue-hi')
    private queueHI: Queue,
  ) {}

  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([
      new BullAdapter(this.queueHI),
      new BullAdapter(this.hellouQueue),
    ]);
    consumer.apply(router).forRoutes('/admin/bull');
  }
}
