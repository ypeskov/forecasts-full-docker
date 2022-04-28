import { Body, Controller, Get, Post } from '@nestjs/common';
import { ForecastDto } from './Dto/forecast.dto'; 
import { QuestionDto } from './Dto/question.dto';

import { ForecastsService, RuneAnswer } from './forecasts.service';

@Controller('forecasts')
export class ForecastsController {
  constructor(private readonly forecastService: ForecastsService) {}

  @Get('/')
  async getForecasts() {
    const forecasts: ForecastDto[] =await this.forecastService.getAllForecasts();

    return forecasts;
  }

  @Post('/question')
  async addNewQuestion(@Body() question: QuestionDto): Promise<RuneAnswer[]> {
    return await this.forecastService.getForecast(question.forecast_id);
  }
}
