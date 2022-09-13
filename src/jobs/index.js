'use strict';

const config = require('config');
const knex = require('knex');
const schedule = require('node-schedule');
const awsHelper = require('../helpers/aws');

const pg = knex(config.get('knex'));

const sendSQS = () => {
  const table = 'vendor_message';
  const rule = new schedule.RecurrenceRule();
  rule.second = [0, 30];

  const task = async () => {
    try {
      await pg.transaction(async (trx) => {
        const updateData = { batchId: new Date().getTime().toString() };
        await pg(table)
          .where({ batchId: null })
          .update(updateData)
          .transacting(trx);

        const rows = await pg(table).where(updateData).distinct('legacyId', 'type').transacting(trx);

        const promises = rows.map(
          (row) => awsHelper.sendToLegacyProfileSQS(row.legacyId, row.type),
        );

        await Promise.all(promises);

        await pg(table).where(updateData).delete().transacting(trx);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    rule,
    task,
  };
};

module.exports = {
  sendSQS: sendSQS(),
};
