const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const rawEndpoint = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';
const endpoint = rawEndpoint.replace('dynamodb-local', 'localhost');

const dynamodb = new AWS.DynamoDB({ endpoint });

dynamodb.listTables({}, (err, data) => {
  if (err) {
    console.error('ListTables error:', err);
  } else {
    console.log('Tables:', data.TableNames);
  }
});
