const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const rawEndpoint = process.env.DYNAMODB_ENDPOINT || "http://localhost:8000";
const endpoint = rawEndpoint.replace("dynamodb-local", "localhost");

const dynamodb = new AWS.DynamoDB({
  endpoint,
});

const params = {
  TableName: process.env.TABLE_NAME,
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" }
  ],
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }
  ],
  BillingMode: "PAY_PER_REQUEST",
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    if (err.code === 'ResourceInUseException') {
      console.log("Table already exists.");
    } else {
      console.log("Error creating table:", err.message);
    }
  } else {
    console.log("Table created successfully!");
    console.log(data);
  }});
