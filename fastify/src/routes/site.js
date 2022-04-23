const Forecast = require('../forecasts/forecasts');

async function routes(fastify, options) {
  fastify.get('/', async (request, reply) => {
    console.log(process.env.RUNES_POSTGRES_NEW);
    return fastify.knex({d: 'forecasts'}).select();
  });

  fastify.post('/questions', async (request, reply) => {
    const divinationId = request.body.forecast_id;
    return (new Forecast(fastify)).getForecast(divinationId);
  });
}

module.exports = routes;