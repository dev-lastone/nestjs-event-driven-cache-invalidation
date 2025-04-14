import { Body, Controller, Post } from '@nestjs/common';
import { MetaAdminService } from './meta.admin.service';
import { PostMetaAdminReqDto } from './meta.admin.dto';

@Controller('meta')
export class MetaAdminController {
  constructor(private readonly metaAdminService: MetaAdminService) {}

  @Post()
  async postMeta(@Body() dto: PostMetaAdminReqDto) {
    await this.metaAdminService.addMeta(dto);
  }
}
