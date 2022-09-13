'use strict';

const merge = require('lodash.merge');
const defaultConfig = require('./config/default');
const development = require('./config/development');
const garage = require('./config/garage');
const konoha = require('./config/konoha');
const liquid = require('./config/liquid');
const matrix = require('./config/matrix');
const playground = require('./config/playground');
const production = require('./config/production');
const qa = require('./config/qa');
const sandbox = require('./config/sandbox');
const spot = require('./config/spot');
const test = require('./config/test');

// This file is only used for migrations. DB config for the application is in /config

module.exports = {
  development: merge({}, defaultConfig.knex, development.knex),
  qa: merge(
    {},
    defaultConfig.knex,
    qa.knex,
  ),
  playground: merge(
    {},
    defaultConfig.knex,
    playground.knex,
  ),
  garage: merge(
    {},
    defaultConfig.knex,
    garage.knex,
  ),
  matrix: merge(
    {},
    defaultConfig.knex,
    matrix.knex,
  ),
  spot: merge(
    {},
    defaultConfig.knex,
    spot.knex,
  ),
  konoha: merge(
    {},
    defaultConfig.knex,
    konoha.knex,
  ),
  liquid: merge(
    {},
    defaultConfig.knex,
    liquid.knex,
  ),
  sandbox: merge(
    {},
    defaultConfig.knex,
    sandbox.knex,
  ),
  production: merge(
    {},
    defaultConfig.knex,
    production.knex,
  ),
  test: merge(
    {},
    defaultConfig.knex,
    test.knex,
  ),
};
