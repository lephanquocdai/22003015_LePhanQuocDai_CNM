const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

class DynamoService {

  constructor() {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION || "ap-southeast-1"
    });

    this.ddb = DynamoDBDocumentClient.from(client);
  }

  getClient() {
    return this.ddb;
  }
}

module.exports = new DynamoService();