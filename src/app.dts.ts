import { ApiProperty } from '@nestjs/swagger';

export class AddTopicReqDto {
  @ApiProperty()
  topic: string;
}

export class SendMessageReqDto {
  @ApiProperty()
  topic: string;
  @ApiProperty()
  message: string;
}
