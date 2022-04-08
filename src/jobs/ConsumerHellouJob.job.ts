import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Hellou } from 'src/dtos/Hellou.dto';

@Processor('hellou-queue')
export class ConsumerHellouJob {
  @Process('hellou-queue-job')
  async consumer(job: Job<Hellou>) {
    const { data } = job;
    console.log(`Dados : `, data);
    console.log(`Queue : ${job.name}`);
  }
}
