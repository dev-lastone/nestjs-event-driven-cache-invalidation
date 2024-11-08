import { Module } from '@nestjs/common';
import { KafkaConfigService } from './kafka.config.service';
import { KafkaService } from './kafka.service';
import { KafkaProducerService } from './kafka-producer.service';

@Module({
  providers: [KafkaConfigService, KafkaService, KafkaProducerService],
  exports: [KafkaService, KafkaProducerService],
})
export class KafkaModule {}
