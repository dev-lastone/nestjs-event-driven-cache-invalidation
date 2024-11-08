import { Injectable } from '@nestjs/common';
import { Consumer, EachMessagePayload, Producer } from 'kafkajs';
import { KafkaConfigService } from './kafka.config.service';

@Injectable()
export class KafkaService {
  private readonly producer: Producer;
  private readonly consumer: Consumer;

  constructor(private kafkaConfigService: KafkaConfigService) {
    this.producer = this.kafkaConfigService.getClient().producer();
    this.producer.connect();

    this.consumer = this.kafkaConfigService
      .getClient()
      .consumer({ groupId: 'nestjs-kafka-group' });
    this.consumer.connect();
    this.consumer.subscribe({ topics: ['test', 'test_a', 'test_b'] });
    this.consumer.run({
      eachMessage: this.consumerCallback,
    });
  }

  async sendMessage(topic: string, message: string) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: message }],
      });
      console.log(`Message sent to topic ${topic}: ${message}`);
    } catch (error) {
      console.error(`Error sending message to Kafka: ${error.message}`);
    }
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
