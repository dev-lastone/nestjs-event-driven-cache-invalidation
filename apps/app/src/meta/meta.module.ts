import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller';
import { MetaService } from './meta.service';
import { KafkaModule } from '@kafka';

@Module({
  imports: [KafkaModule],
  controllers: [MetaController],
  providers: [MetaService],
})
export class MetaModule {}
