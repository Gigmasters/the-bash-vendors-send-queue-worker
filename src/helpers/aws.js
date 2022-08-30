'use strict';

const AWS = require('aws-sdk');
const config = require('config');

const awsConfig = config.get('aws');
const sqsConfig = config.get('sqs');
AWS.config.update(awsConfig);

const sendToLegacyProfileSQS = async (vendorLegacyId, messageType) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.log('send sqs:', {
      QueueUrl: sqsConfig.profileQUrl,
      MessageBody: {
        MemberId: vendorLegacyId,
        Type: messageType,
      },
    });

    return null;
  }

  const sqs = new AWS.SQS();
  return sqs.sendMessage({
    QueueUrl: sqsConfig.profileQUrl,
    MessageBody: JSON.stringify({
      MemberId: vendorLegacyId,
      Type: messageType,
    }),
  }).promise();
};

module.exports = {
  sendToLegacyProfileSQS,
};
