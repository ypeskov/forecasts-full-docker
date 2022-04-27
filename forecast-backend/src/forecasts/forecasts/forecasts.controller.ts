import { Controller, Get } from '@nestjs/common';

@Controller('forecasts')
export class ForecastsController {
    @Get()
    getForecasts() {
        return {name: 'Yura'};
    }
}
