'use strict';

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('vendorMessage').del();
  await knex('vendorMessage').insert([
    { type: 18, legacyId: 9921, batchId: null },
    { type: 18, legacyId: 9922, batchId: null },
    { type: 19, legacyId: 9922, batchId: null },
    { type: 19, legacyId: 9923, batchId: null },
    { type: 18, legacyId: 9923, batchId: null },
    { type: 18, legacyId: 9923, batchId: null },
  ]);
};
