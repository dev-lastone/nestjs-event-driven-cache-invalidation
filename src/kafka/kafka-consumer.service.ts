import { Injectable } from '@nestjs/common';
import { KafkaConfigService } from './kafka.config.service';
import { Consumer, EachMessagePayload } from 'kafkajs';

@Injectable()
export class KafkaConsumerService {
  private readonly consumer: Consumer;

  constructor(private kafkaConfigService: KafkaConfigService) {
    this.consumer = this.kafkaConfigService
      .getClient()
      .consumer({ groupId: 'nestjs-kafka-group' });
    this.consumer.connect();
  }

  async subscribe(topic: string, callback: (message: any) => Promise<boolean>) {
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
  }

  async #commitManually({ topic, partition, offset }) {
    await this.consumer.commitOffsets([{ topic, partition, offset }]);
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}
