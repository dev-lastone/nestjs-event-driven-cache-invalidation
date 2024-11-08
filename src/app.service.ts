import { Injectable } from '@nestjs/common';
import { SendMessageReqDto } from './app.dts';
import { KafkaProducerService } from './kafka/kafka-producer.service';
import { KafkaConsumerService } from './kafka/kafka-consumer.service';

@Injectable()
export class AppService {
  constructor(
    private readonly kafkaProducerService: KafkaProducerService,
    private readonly kafkaConsumerService: KafkaConsumerService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addTopic(topic: string) {
    await this.kafkaConsumerService.subscribe(topic, async (message) => {
      // 메시지 처리 로직
      console.log(message);
      return true;
      // TODO 메시지 처리 로직 실패 false
    });
  }

  async sendMessage(dto: SendMessageReqDto) {
    await this.kafkaProducerService.sendMessage(dto);
  }
}
