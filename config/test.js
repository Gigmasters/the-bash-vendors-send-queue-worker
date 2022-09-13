'use strict';

module.exports = {
  knex: {
    connection: {
      password: 'password',
      host: 'pgtest',
      port: '5432',
    },
    migrations: {
      directory: './migrations/test',
    },
    seeds: { directory: './seeds/test' },
  },
};
