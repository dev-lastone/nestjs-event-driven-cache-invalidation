import { Injectable } from '@nestjs/common';
import { KafkaConfigService } from './kafka.config.service';
import { Consumer, EachMessagePayload } from 'kafkajs';

@Injectable()
export class KafkaConsumerService {
  private readonly subscribedTopics: Map<string, boolean> = new Map();
  private readonly consumer: Consumer;

  constructor(private kafkaConfigService: KafkaConfigService) {
    this.consumer = this.kafkaConfigService
      .getClient()
      .consumer({ groupId: 'nestjs-kafka-group' });
    this.consumer.connect();
  }

  isSubscribed(topic: string) {
    return this.subscribedTopics.has(topic);
  }

  async subscribe(topic: string, callback: (message: any) => Promise<boolean>) {
    if (this.subscribedTopics.has(topic)) {
      throw new Error('Already subscribed to this topic');
    }

    const eachMessage = async (payload: EachMessagePayload) => {
      const { topic, partition, message } = payload;

      const isOk = await callback(payload);

      if (isOk) {
        await this.#commitManually({
          topic,
          partition,
          offset: message.offset,
        });
      }
    };

    await this.consumer.subscribe({ topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage,
      autoCommit: false,
    });

    this.subscribedTopics.set(topic, true);
  }

  async #commitManually({ topic, partition, offset }) {
    await this.consumer.commitOffsets([{ topic, partition, offset }]);
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}
