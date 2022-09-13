'use strict';

const config = require('config');
const knex = require('knex');
const jobs = require('../../../src/jobs');
const awsHelper = require('../../../src/helpers/aws');

const pg = knex(config.get('knex'));

describe('src/jobs', () => {
  beforeEach(() => {
    jest.spyOn(awsHelper, 'sendToLegacyProfileSQS');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('sendSQS job', () => {
    it('it is object ', () => {
      expect(jobs.sendSQS).toEqual({
        rule: {
          date: null,
          dayOfWeek: null,
          hour: null,
          minute: null,
          month: null,
          recurs: true,
          second: [0, 30],
          year: null,
        },
        task: expect.any(Function),
      });
    });

    describe('include task method', () => {
      const table = 'vendor_message';

      beforeEach(async () => {
        await pg.seed.run({ specific: 'vendorMessage.js' });
      });

      afterEach(async () => {
        await pg(table).truncate();
      });

      describe('#task', () => {
        it('calll sendToLegacyProfileSQS and update data', async () => {
          const beginRows = await pg(table).select();
          expect(beginRows.length).toBe(8);

          await jobs.sendSQS.task();

          expect(awsHelper.sendToLegacyProfileSQS).toHaveBeenCalledTimes(5);
          expect(awsHelper.sendToLegacyProfileSQS)
            .toHaveBeenNthCalledWith(1, 9921, 18);

          expect(awsHelper.sendToLegacyProfileSQS)
            .toHaveBeenNthCalledWith(2, 9922, 18);

          expect(awsHelper.sendToLegacyProfileSQS)
            .toHaveBeenNthCalledWith(3, 9922, 19);

          expect(awsHelper.sendToLegacyProfileSQS)
            .toHaveBeenNthCalledWith(4, 9923, 18);

          expect(awsHelper.sendToLegacyProfileSQS)
            .toHaveBeenNthCalledWith(5, 9923, 19);

          const endRows = await pg(table).select();
          expect(endRows.length).toBe(2);
        });

        it('log a message when throw error', async () => {
          const error = new Error('error message');
          awsHelper.sendToLegacyProfileSQS.mockRejectedValue(error);
          jest.spyOn(console, 'error').mockImplementation(() => {});

          const beginRows = await pg(table).select();
          expect(beginRows.length).toBe(8);

          await jobs.sendSQS.task();

          const endRows = await pg(table).select();
          expect(endRows.length).toBe(8);

          expect(console.error).toHaveBeenCalledWith(error);
        });
      });
    });
  });
});
