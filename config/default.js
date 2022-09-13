'use strict';

const { stringCamelToSnakeCase, objectSnakeToCamelCase } = require('../src/utils/converter');

module.exports = {
  knex: {
    client: 'pg',
    connection: {
      user: 'bash_api',
      port: '5432',
      host: 'pg',
      database: 'thebash',
    },
    pool: {
      min: 0,
      max: 20,
    },
    // The below functions help translate from PG preferred snake_case to JS preferred camelCase
    wrapIdentifier: (value, origImpl) => origImpl(stringCamelToSnakeCase(value)),
    // This translates a response snake_case back to JS camelCase
    postProcessResponse: (result) => {
      // TODO: add special case for raw results (depends on dialect)
      if (Array.isArray(result)) {
        return result.map((row) => objectSnakeToCamelCase(row));
      }
      return objectSnakeToCamelCase(result);
    },
  },
  sqs: {
    profileQUrl: '',
  },
  aws: {
    region: 'us-west-2',
  },
};
