'use strict';

const schedule = require('node-schedule');

const { sendSQS } = require('./src/jobs');

try {
  schedule.scheduleJob(sendSQS.rule, sendSQS.task);
  console.log('start worker......');
} catch (error) {
  console.log(error);
}
