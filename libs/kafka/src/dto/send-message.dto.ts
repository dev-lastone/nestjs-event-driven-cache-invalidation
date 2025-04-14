import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty()
  topic: string;
  @ApiProperty()
  message: string;
}
