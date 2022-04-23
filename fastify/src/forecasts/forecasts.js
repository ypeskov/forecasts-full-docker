class Forecast {
  constructor(fastify) {
    this.fastify = fastify;
  }

  async getForecast(divinationId) {
    const numberOfRunes = this.getNumberOfRunes(divinationId);
    const randomRuneOrders = this.getRandomOrders(numberOfRunes);
    const runes = await this.retrieveRunesFromDB(randomRuneOrders);
    const answers = this.getAnswers(runes);

    return answers;
  }

  getNumberOfRunes(divinationId) {
    let numberOfRunes = 1;
    switch (divinationId) {
      case 1:
        numberOfRunes = 1;
        break;
      case 2:
        numberOfRunes = 2;
        break;
      case 3:
        numberOfRunes = 3;
        break;
      default:
        throw new Error('Unknown forecast');
    }

    return numberOfRunes;
  }

  getRandomOrders(numberOfRunes) {
    const orders = [];
    for (let i = 1; i < 25; orders.push(i), i++) {
    }

    return orders
      .map(value => ({value, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(({value}) => value)
      .slice(-numberOfRunes);
  }

  getAnswers(runes) {
    return runes.map(rune => {
      const temp_answer = {
        'title': rune.title,
        description: rune.description,
        forecast: rune.forecast_direct,
        position: 'Direct position'
      };
      if (rune.has_inverted) {
        const is_inverted = Math.floor(Math.random() * 2);
        if (is_inverted) {
          temp_answer.forecast = rune.forecast_inverted;
          temp_answer.position = 'Inverted position';
        }
      }

      return temp_answer;
    });
  }

  async retrieveRunesFromDB(ordersList) {
    return this.fastify.knex({r: 'runes'})
      .select({
        order: 'r.order',
        has_inverted: 'r.has_inverted',
        title: 'rt.title',
        description: 'rt.description',
        forecast_direct: 'rt.forecast_meaning_direct',
        forecast_inverted: 'rt.forecast_meaning_inverted'
      })
      .join('runetranslations as rt', 'r.id', 'rt.rune_id')
      .whereIn('r.order', ordersList);
  }
}

module.exports = Forecast;