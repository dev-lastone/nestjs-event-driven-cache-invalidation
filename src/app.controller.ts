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
  async addTopic(@Body() dto: AddTopicReqDto): Promise<string> {
    const { topic } = dto;
    if (topic == undefined) {
      return 'topic is undefined';
    } else {
      await this.appService.addSubscriptionTopic(topic);
      return `topic ${topic} added`;
    }
  }

  @Post('send-message')
  async sendMessage(@Body() dto: SendMessageReqDto): Promise<string> {
    const { topic, message } = dto;
    if (topic == undefined || message == undefined) {
      return 'topic or message is undefined';
    } else {
      await this.appService.sendMessage(topic, message);
      return `message sent to ${topic}`;
    }
  }
}
