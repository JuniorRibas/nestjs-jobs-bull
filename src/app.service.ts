import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('queue-hi')
    private readonly queueHi: Queue,
    @InjectQueue('hellou-queue')
    private readonly queueHellou: Queue,
  ) {}

  async getHello(): Promise<string> {
    await this.queueHi.addBulk([
      { name: 'job-hi', data: { send: 'HI' }, opts: { delay: 2 * 1000 } },
      { name: 'job-hi', data: { send: 'HI' }, opts: { delay: 3 * 1000 } },
      { name: 'job-hi', data: { send: 'HI' }, opts: { delay: 4 * 1000 } },
      { name: 'job-hi', data: { send: 'HI' }, opts: { delay: 5 * 1000 } },
      { name: 'job-hi', data: { send: 'HI' }, opts: { delay: 6 * 1000 } },
      { name: 'job-hi', data: { send: 'HI' }, opts: { delay: 7 * 1000 } },
      { name: 'job-hi', data: { send: 'HI' }, opts: { delay: 8 * 1000 } },
      { name: 'job-hi', data: { send: 'HI' }, opts: { delay: 9 * 1000 } },
    ]);

    await this.queueHellou.add(
      'hellou-queue-job',
      { messagem: 'Hellou Ribas' },
      { delay: 5000 },
    );
    return 'Hello World!';
  }
}
