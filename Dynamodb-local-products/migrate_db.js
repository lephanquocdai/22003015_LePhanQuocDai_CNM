const dynamodb = require('./config/dynamodb');
require('dotenv').config();

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;

async function migrate() {
    console.log('Starting data migration/cleanup...');
    try {
        const data = await dynamodb.scan({ TableName: TABLE_NAME }).promise();
        console.log(`Scanning table ${TABLE_NAME}, found ${data.Items.length} items.`);

        for (const item of data.Items) {
            let needsUpdate = false;
            let needsDelete = false;
            const updateItem = { ...item };

            // 1. Handle missing or wrong-cased id
            if (!item.id && item.ID) {
                console.log(`Migrating ID to id for item: ${item.name}`);
                updateItem.id = item.ID;
                needsUpdate = true;
            } else if (!item.id) {
                console.log(`Item with no ID found (Name: ${item.name}). Deleting corrupted item.`);
                needsDelete = true;
            }

            // 2. Handle wrong bucket URLs
            if (item.url_image && item.url_image.includes('qhuy-bucket-tuan10')) {
                console.log(`Clearing invalid image URL for item: ${item.name || item.id}`);
                updateItem.url_image = '';
                needsUpdate = true;
            }

            if (needsDelete) {
                // We can't delete without a key. If 'id' is empty, we must find the partition key.
                // If it's literally empty, we might have to use whatever is there.
                try {
                    // Try to delete using 'id' even if it's undefined/null if that's what's in DB
                    await dynamodb.delete({ TableName: TABLE_NAME, Key: { id: item.id } }).promise();
                    console.log(`Deleted item.`);
                } catch (e) {
                    console.error(`Failed to delete item:`, e.message);
                }
            } else if (needsUpdate) {
                await dynamodb.put({ TableName: TABLE_NAME, Item: updateItem }).promise();
                console.log(`Updated item ${updateItem.id}.`);
            }
        }
        console.log('Migration finished.');
    } catch (err) {
        console.error('Migration error:', err);
    }
}

migrate();
