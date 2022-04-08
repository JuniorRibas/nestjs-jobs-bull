import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('hellou-queue') private readonly queueHellou: Queue,
  ) {}

  getHello(): string {
    this.queueHellou.add(
      'hellou-queue-job',
      { messagem: 'Hellou Ribas' },
      { delay: 5000 },
    );
    return 'Hello World!';
  }
}
