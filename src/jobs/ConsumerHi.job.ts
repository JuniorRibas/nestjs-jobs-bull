import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('queue-hi')
export class ConsumerHi {
  @Process('job-hi')
  async execHi(job: Job) {
    const { data } = job;
    console.log(`Dados : `, data);
    console.log(`Queue : ${job.name}`);
  }
}
