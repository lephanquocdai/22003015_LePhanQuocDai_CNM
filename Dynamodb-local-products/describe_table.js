const AWS = require('aws-sdk');
require('dotenv').config();

const dynamodb = new AWS.DynamoDB({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;

async function describe() {
    console.log('Describing table:', TABLE_NAME);
    try {
        const data = await dynamodb.describeTable({ TableName: TABLE_NAME }).promise();
        console.log('KeySchema:', JSON.stringify(data.Table.KeySchema, null, 2));
        console.log('AttributeDefinitions:', JSON.stringify(data.Table.AttributeDefinitions, null, 2));
    } catch (err) {
        console.error('Error:', err.message);
    }
}

describe();
