'use strict';

module.exports = {
  knex: {
    connection: {
      host: 'thebash-vendors-qa.chramuaoydse.us-east-1.rds.amazonaws.com',
      password: process.env.PG_PASSWORD,
      database: 'thebash_liquid',
    },
  },
  sqs: {
    profileQUrl: 'https://sqs.us-west-2.amazonaws.com/457046176595/Profile-Q-Liquid',
  },
};
