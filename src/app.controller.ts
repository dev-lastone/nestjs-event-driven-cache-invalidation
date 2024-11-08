import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AddTopicReqDto } from './app.dts';

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
}
