import { Injectable } from '@nestjs/common';
import { PostMetaReqDto } from './meta.dto';
import { KafkaProducerService } from '../kafka/kafka-producer.service';
import { KafkaConsumerService } from '../kafka/kafka-consumer.service';

@Injectable()
export class MetaService {
  private readonly TOPIC = 'meta';
  private readonly meta = [];

  constructor(
    private readonly kafkaProducerService: KafkaProducerService,
    private readonly kafkaConsumerService: KafkaConsumerService,
  ) {
    this.#initMeta();
  }

  #initMeta() {
    // DB 대체
    this.meta.push({
      name: 'test',
    });
  }

  async addMeta(dto: PostMetaReqDto) {
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

    // 메시지 전송
    await this.kafkaProducerService.sendMessage({
      topic: this.TOPIC,
      message: JSON.stringify(dto),
    });
  }

  getMeta() {
    return this.meta;
  }
}
