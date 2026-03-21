const dynamodb = require('./config/dynamodb');
require('dotenv').config();

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;

async function check() {
    console.log('Scanning table:', TABLE_NAME);
    try {
        const data = await dynamodb.scan({ TableName: TABLE_NAME }).promise();
        console.log('Total items:', data.Items.length);
        data.Items.forEach(item => {
            console.log(`ID: ${item.id}, Name: ${item.name}, ImageURL: ${item.url_image}`);
        });
    } catch (err) {
        console.error('Error:', err);
    }
}

check();
