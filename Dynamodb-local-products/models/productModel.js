const dynamodb = require('../config/dynamodb');
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;

const ProductModel = {
    create: async(product) => {
        const params = { TableName: TABLE_NAME, Item: product };
        return dynamodb.put(params).promise();
    },

    getAll: async() => {
        const params = { TableName: TABLE_NAME };
        return dynamodb.scan(params).promise();
    },

    getById: async(ID) => {
        const params = { TableName: TABLE_NAME, Key: { ID } };
        return dynamodb.get(params).promise();
    },

    update: async(ID, data) => {
        const params = {
            TableName: TABLE_NAME,
            Key: { ID },
            UpdateExpression: 'set #name = :name, price = :price, unit_in_stock = :unit_in_stock, url_image = :url_image',
            ExpressionAttributeNames: { '#name': 'name' },
            ExpressionAttributeValues: {
                ':name': data.name,
                ':price': data.price,
                ':unit_in_stock': data.unit_in_stock,
                ':url_image': data.url_image,
            },
            ReturnValues: 'UPDATED_NEW',
        };
        return dynamodb.update(params).promise();
    },

    delete: async(ID) => {
        const params = { TableName: TABLE_NAME, Key: { ID } };
        return dynamodb.delete(params).promise();
    },
};

module.exports = ProductModel;