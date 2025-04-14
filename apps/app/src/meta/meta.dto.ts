import { ApiProperty } from '@nestjs/swagger';

export class PostMetaReqDto {
  @ApiProperty()
  name: string;
}
