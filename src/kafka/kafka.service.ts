import { Injectable } from '@nestjs/common';
import { Consumer, EachMessagePayload } from 'kafkajs';
import { KafkaConfigService } from './kafka.config.service';

@Injectable()
export class KafkaService {
  private readonly consumer: Consumer;

  constructor(private kafkaConfigService: KafkaConfigService) {
    this.consumer = this.kafkaConfigService
      .getClient()
      .consumer({ groupId: 'nestjs-kafka-group' });
    this.consumer.connect();
    this.consumer.subscribe({ topics: ['test', 'test_a', 'test_b'] });
    this.consumer.run({
      eachMessage: this.consumerCallback,
    });
  }

  async consumerCallback(payload: EachMessagePayload) {
    console.log('kafka message arrived');
    console.log(
      `topic: ${payload.topic}, Message:${payload.message.value.toString()}`,
    );
  }

  async addSubscriptionTopic(topic: string) {
    await this.consumer.stop();
    await this.consumer.subscribe({ topic });
    await this.consumer.run({
      eachMessage: this.consumerCallback,
    });
  }
}
