const dynamodb = require('./config/dynamodb');
require('dotenv').config();

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;

async function cleanup() {
    console.log('Starting final cleanup (removing lowercase id attribute)...');
    try {
        const data = await dynamodb.scan({ TableName: TABLE_NAME }).promise();
        for (const item of data.Items) {
            if (item.id) {
                console.log(`Cleaning item: ${item.name || item.ID}`);
                const newItem = { ...item };
                delete newItem.id; // Remove the lowercase 'id' attribute
                await dynamodb.put({ TableName: TABLE_NAME, Item: newItem }).promise();
            }
        }
        console.log('Cleanup finished.');
    } catch (err) {
        console.error('Cleanup error:', err);
    }
}

cleanup();
