'use strict';

const stringSnakeToCamelCase = (str) => str.replace(
  /([-_][a-z])/g,
  (group) => group.toUpperCase().replace('_', ''),
);

const stringCamelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const objectSnakeToCamelCase = (obj) => (
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [stringSnakeToCamelCase(k), v]),
  )
);

module.exports = {
  stringSnakeToCamelCase,
  objectSnakeToCamelCase,
  stringCamelToSnakeCase,
};
