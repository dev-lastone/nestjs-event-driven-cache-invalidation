import { Injectable } from '@nestjs/common';
import { EachMessagePayload, Kafka } from 'kafkajs';

@Injectable()
export class AppService {
  private kafka = new Kafka({
    clientId: 'nestjs-kafka',
    brokers: ['localhost:9094'],
  });
  private readonly producer = this.kafka.producer();
  private readonly consumer = this.kafka.consumer({
    groupId: 'nestjs-kafka-group',
  });

  constructor() {
    this.consumer.connect();
    this.consumer.subscribe({ topics: ['test', 'test_a', 'test_b'] });
    this.consumer.run({
      eachMessage: this.consumerCallback,
    });

    this.producer.connect();
  }

  async consumerCallback(payload: EachMessagePayload) {
    console.log('kafka message arrived');
    console.log(
      `topic: ${payload.topic}, Message:${payload.message.value.toString()}`,
    );
  }

  getHello(): string {
    return 'Hello World!';
  }

  async addSubscriptionTopic(topic: string) {
    await this.consumer.stop();
    await this.consumer.subscribe({ topic }); // 구독하고
    await this.consumer.run({
      eachMessage: this.consumerCallback,
    });
  }

  async sendMessage(topic: string, message: string) {
    await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
  }
}
