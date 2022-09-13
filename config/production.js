'use strict';

module.exports = {
  knex: {
    connection: {
      host: 'thebash-vendors-production.chramuaoydse.us-east-1.rds.amazonaws.com',
      user: 'bash_vendor_api',
      password: process.env.PG_PASSWORD,
    },
  },
  sqs: {
    profileQUrl: 'https://sqs.us-west-2.amazonaws.com/457046176595/Profile-Q-Production',
  },
};
