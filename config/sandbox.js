'use strict';

// Sandbox will be enabled at a later date
module.exports = {
  knex: {
    connection: {
      host: 'thebash-vendors-qa.chramuaoydse.us-east-1.rds.amazonaws.com',
      password: process.env.PG_PASSWORD,
      database: 'thebash_sandbox',
    },
  },
  sqs: {
    profileQUrl: 'https://sqs.us-west-2.amazonaws.com/457046176595/Profile-Q-Sandbox',
  },
};
