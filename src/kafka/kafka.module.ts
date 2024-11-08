import { Module } from '@nestjs/common';
import { KafkaConfigService } from './kafka.config.service';
import { KafkaService } from './kafka.service';

@Module({
  providers: [KafkaConfigService, KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
