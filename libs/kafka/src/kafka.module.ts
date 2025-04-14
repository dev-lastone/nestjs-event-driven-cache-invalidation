import { Module } from '@nestjs/common';
import { KafkaConfigService } from '@kafka/kafka.config.service';
import { KafkaProducerService } from '@kafka/kafka-producer.service';
import { KafkaConsumerService } from '@kafka/kafka-consumer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [KafkaConfigService, KafkaProducerService, KafkaConsumerService],
  exports: [KafkaProducerService, KafkaConsumerService],
})
export class KafkaModule {}
