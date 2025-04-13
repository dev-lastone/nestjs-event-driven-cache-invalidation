import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { MetaModule } from './meta/meta.module';

@Module({
  imports: [KafkaModule, MetaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
