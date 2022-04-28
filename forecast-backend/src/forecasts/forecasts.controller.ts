import { Body, Controller, Get, Post } from '@nestjs/common';
import { ForecastDto } from './Dto/Forecast.dto';
import { QuestionDto } from './Dto/questionDto';

import { ForecastsService } from './forecasts.service';

@Controller('forecasts')
export class ForecastsController {
  constructor(private readonly forecastSerivce: ForecastsService) {}

  @Get('/')
  async getForecasts() {
    const forecasts: ForecastDto[] =await this.forecastSerivce.getAllForecasts();

    return forecasts;
  }

  @Post('/question')
  addNewQuestion(@Body() question: QuestionDto) {
    console.log(question);
  }
}
