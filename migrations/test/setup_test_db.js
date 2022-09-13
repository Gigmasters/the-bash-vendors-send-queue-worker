'use strict';

exports.up = async (knex) => {
  await knex.schema.createTable('vendor_message', (t) => {
    t.integer('legacy_id').notNullable();
    t.integer('type').notNullable();
    t.string('batch_id', 14);
  });
};

exports.down = async () => {};
