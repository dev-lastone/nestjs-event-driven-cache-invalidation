import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MetaAdminModule } from './meta/meta.admin.module';

@Module({
  imports: [MetaAdminModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
