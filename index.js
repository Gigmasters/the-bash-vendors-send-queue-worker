'use strict';

const schedule = require('node-schedule');

(async () => {
    const rule = new schedule.RecurrenceRule();
    rule.second = [0, 30];

    console.log('worker started.');

    try {
        schedule.scheduleJob(rule, () => { console.log(new Date(), 'Bulk send queue here.'); });
    } catch (error) {
        console.log(error);
    }
})();