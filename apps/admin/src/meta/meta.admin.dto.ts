import { ApiProperty } from '@nestjs/swagger';

export class PostMetaAdminReqDto {
  @ApiProperty()
  name: string;
}
