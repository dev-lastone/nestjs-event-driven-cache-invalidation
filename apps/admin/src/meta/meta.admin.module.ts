import { Module } from '@nestjs/common';
import { MetaAdminController } from './meta.admin.controller';
import { MetaAdminService } from './meta.admin.service';
import { KafkaModule } from '@kafka';

@Module({
  imports: [KafkaModule],
  controllers: [MetaAdminController],
  providers: [MetaAdminService],
})
export class MetaAdminModule {}
