const dynamoDB = require("../config/dynamodb");

const TABLE_NAME = process.env.TABLE_NAME;

const ProductModel = {
  create: async (product) => {
    const params = {
      TableName: TABLE_NAME,
      Item: product,
    };
    return dynamoDB.put(params).promise();
  },

  getAll: async () => {
    const params = {
      TableName: TABLE_NAME,
    };
    return dynamoDB.scan(params).promise();
  },

  getById: async (id) => {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
    };
    return dynamoDB.get(params).promise();
  },

  update: async (id, data) => {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression:
        "set #name = :name, price = :price, url_image = :url_image",
      ExpressionAttributeNames: {
        "#name": "name",
      },
      ExpressionAttributeValues: {
        ":name": data.name,
        ":price": data.price,
        ":url_image": data.url_image,
      },
      ReturnValues: "UPDATED_NEW",
    };
    return dynamoDB.update(params).promise();
  },

  delete: async (id) => {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
    };
    return dynamoDB.delete(params).promise();
  },
};

module.exports = ProductModel;
