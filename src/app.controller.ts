import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AddTopicReqDto, SendMessageReqDto } from './app.dts';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('add-topic')
  async addTopic(@Body() dto: AddTopicReqDto) {
    await this.appService.addTopic(dto.topic);
  }

  @Post('send-message')
  async sendMessage(@Body() dto: SendMessageReqDto) {
    await this.appService.sendMessage(dto);
  }
}
