const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, PutCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

class TodoModel {

  constructor() {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION
    });

    this.ddb = DynamoDBDocumentClient.from(client);
    this.tableName = process.env.TODO_TABLE;
  }

  async getAllTodos() {

    const result = await this.ddb.send(
      new ScanCommand({
        TableName: this.tableName
      })
    );

    return result.Items || [];
  }

  async addTodo(title) {

    const item = {
      todoId: uuidv4(),
      title: title,
      done: false,
      createdAt: new Date().toISOString()
    };

    await this.ddb.send(
      new PutCommand({
        TableName: this.tableName,
        Item: item
      })
    );
  }

  async toggleTodo(todoId) {

    await this.ddb.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { todoId },
        UpdateExpression: "SET done = :d",
        ExpressionAttributeValues: {
          ":d": true
        }
      })
    );
  }

}

module.exports = new TodoModel();