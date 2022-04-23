const app = async function (fastify, options) {
  fastify.register(require('fastify-cors'), {
    origin: true
  });

  fastify.register(require('fastify-knexjs'), {
    client: 'pg',
    connection: {
      host: process.env.RUNES_DB_HOST,
      port: process.env.RUNES_DB_PORT,
      user: process.env.RUNES_DB_USER,
      password: process.env.RUNES_DB_PASSWORD,
      database: process.env.RUNES_DB_NAME
    }
  }
  );

  fastify.register(require('./routes/site'));
};

module.exports = app;

module.exports.options = {
  logger: true
};


