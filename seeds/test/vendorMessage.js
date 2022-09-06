'use strict';

const tableName = 'vendor_message';

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableName).truncate();
  await knex(tableName).insert([
    { type: 18, legacyId: 9921, batchId: null },
    { type: 18, legacyId: 9922, batchId: null },
    { type: 19, legacyId: 9922, batchId: null },
    { type: 19, legacyId: 9923, batchId: null },
    { type: 18, legacyId: 9923, batchId: null },
    { type: 18, legacyId: 9923, batchId: null },
    { type: 18, legacyId: 9923, batchId: new Date().getTime().toString() },
    { type: 18, legacyId: 9923, batchId: new Date().getTime().toString() },
  ]);
};
