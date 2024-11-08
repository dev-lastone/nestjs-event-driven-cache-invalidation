import { Injectable } from '@nestjs/common';
import { KafkaService } from './kafka/kafka.service';
import { SendMessageReqDto } from './app.dts';

@Injectable()
export class AppService {
  constructor(private readonly kafkaService: KafkaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addTopic(topic: string) {
    await this.kafkaService.addSubscriptionTopic(topic);
  }

  async sendMessage(dto: SendMessageReqDto) {
    await this.kafkaService.sendMessage(dto.topic, dto.message);
  }
}
