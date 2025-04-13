import { Body, Controller, Get, Post } from '@nestjs/common';
import { MetaService } from './meta.service';
import { PostMetaReqDto } from './meta.dto';

@Controller('meta')
export class MetaController {
  constructor(private readonly metaService: MetaService) {}

  @Post()
  async postMeta(@Body() dto: PostMetaReqDto) {
    await this.metaService.addMeta(dto);
  }

  @Get()
  getMeta() {
    return this.metaService.getMeta();
  }
}
