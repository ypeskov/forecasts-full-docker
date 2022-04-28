import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

import { ForecastDto } from './Dto/Forecast.dto';

@Injectable()
export class ForecastsService {
  constructor(@InjectKnex() private readonly db: Knex) { }

  async getAllForecasts(): Promise<ForecastDto[]> {
    return await this.db({ d: 'forecasts' }).select();
  }
}
