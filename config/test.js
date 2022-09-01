'use strict';

module.exports = {
  knex: {
    connection: {
      password: 'password',
      host: 'pgtest',
    },
    migrations: {
      directory: './migrations/test',
    },
    seeds: { directory: './seeds/test' },
  },
};
