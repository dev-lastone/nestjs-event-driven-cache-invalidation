import { Injectable } from '@nestjs/common';
import { Kafka, logLevel } from 'kafkajs';

@Injectable()
export class KafkaConfigService {
  private readonly kafka: Kafka;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'nestjs-kafka',
      brokers: ['localhost:9094'],
      logLevel: logLevel.INFO,
    });
  }

  getClient(): Kafka {
    return this.kafka;
  }
}
