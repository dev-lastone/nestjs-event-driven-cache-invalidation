import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaConsumerService } from '@kafka/kafka-consumer.service';

@Injectable()
export class MetaService implements OnModuleInit {
  private readonly TOPIC = 'meta';
  private readonly meta = [];

  constructor(private readonly kafkaConsumerService: KafkaConsumerService) {}

  async onModuleInit() {
    // TODO 최초 조회

    // 구독여부 확인 후 구독
    const isSubscribed = this.kafkaConsumerService.isSubscribed(this.TOPIC);
    if (!isSubscribed) {
      await this.kafkaConsumerService.subscribe(this.TOPIC, async (data) => {
        const res = JSON.parse(data.message.value.toString());
        // 메시지 수신 후 처리
        this.meta.push({
          name: res.name,
        });
        return true;
      });
    }
  }

  getMeta() {
    return this.meta;
  }
}
