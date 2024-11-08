import { Injectable } from '@nestjs/common';
import { KafkaConfigService } from './kafka.config.service';
import { Consumer } from 'kafkajs';

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
    await this.consumer.subscribe({ topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const callbackMessage = {
          value: message.value.toString(),
          partition: partition,
          offset: message.offset,
        };

        const isOk = await callback(callbackMessage);

        if (isOk) {
          await this.commitManually({
            topic,
            partition,
            offset: message.offset,
          });
        }
      },
      autoCommit: false,
    });
  }

  private async commitManually({ topic, partition, offset }) {
    await this.consumer.commitOffsets([{ topic, partition, offset }]);
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}
