import { Injectable } from '@nestjs/common';
import { KafkaService } from './kafka/kafka.service';
import { SendMessageReqDto } from './app.dts';
import { KafkaProducerService } from './kafka/kafka-producer.service';

@Injectable()
export class AppService {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly kafkaProducerService: KafkaProducerService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addTopic(topic: string) {
    await this.kafkaService.addSubscriptionTopic(topic);
  }

  async sendMessage(dto: SendMessageReqDto) {
    await this.kafkaProducerService.sendMessage(dto);
  }
}
