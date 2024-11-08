import { ApiProperty } from '@nestjs/swagger';

export class AddTopicReqDto {
  @ApiProperty()
  topic: string;
}
