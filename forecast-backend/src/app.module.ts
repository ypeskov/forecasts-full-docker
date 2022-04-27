import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForecastsModule } from './forecasts/forecasts.module';

@Module({
  imports: [ForecastsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
