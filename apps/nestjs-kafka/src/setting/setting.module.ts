import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
