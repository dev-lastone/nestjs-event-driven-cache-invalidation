import { Injectable } from '@nestjs/common';
import { PostMetaAdminReqDto } from './meta.admin.dto';
import { KafkaProducerService } from '@kafka/kafka-producer.service';

@Injectable()
export class MetaAdminService {
  private readonly TOPIC = 'meta';
  private readonly meta = [];

  constructor(private readonly kafkaProducerService: KafkaProducerService) {
    this.#initMeta();
  }

  #initMeta() {
    // DB 대체
    this.meta.push({
      name: 'test',
    });
  }

  async addMeta(dto: PostMetaAdminReqDto) {
    await this.kafkaProducerService.sendMessage({
      topic: this.TOPIC,
      message: JSON.stringify(dto),
    });
  }

  getMeta() {
    return this.meta;
  }
}
