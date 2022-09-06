'use strict';

const config = require('config');

const AWS = require('aws-sdk');
const awsHelper = require('../../../src/helpers/aws');

jest.mock('aws-sdk');

describe('src/helpers/aws', () => {
  const sqsConfig = config.get('sqs');
  const mockSQS = {
    sendMessage: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };

  beforeEach(() => {
    AWS.SQS.mockReturnValue(mockSQS);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('#sendToLegacyProfileSQS', () => {
    it('call SQS sendMessage', async () => {
      await awsHelper.sendToLegacyProfileSQS(9921, 18);

      expect(mockSQS.sendMessage).toHaveBeenCalledWith(
        {
          QueueUrl: sqsConfig.profileQUrl,
          MessageBody: JSON.stringify({
            MemberId: 9921,
            Type: 18,
          }),
        },
      );
    });
  });
});
