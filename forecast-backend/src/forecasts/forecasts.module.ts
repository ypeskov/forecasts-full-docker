import { Module } from '@nestjs/common';
import { ForecastsController } from './forecasts/forecasts.controller';

@Module({
  controllers: [ForecastsController]
})
export class ForecastsModule {}
