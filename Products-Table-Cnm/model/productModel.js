const { dynamoDB } = require("../config/aws")
const { ScanCommand, PutCommand, DeleteCommand, GetCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb")

const TABLE = "Products"

exports.getAll = async() => {
    const data = await dynamoDB.send(new ScanCommand({
        TableName: TABLE
    }))
    return data.Items
}

exports.create = async(product) => {
    await dynamoDB.send(new PutCommand({
        TableName: TABLE,
        Item: product
    }))
}

exports.delete = async(id) => {
    await dynamoDB.send(new DeleteCommand({
        TableName: TABLE,
        Key: { ID: id }
    }))
}

exports.getById = async(id) => {
    const data = await dynamoDB.send(new GetCommand({
        TableName: TABLE,
        Key: { ID: id }
    }))
    return data.Item
}

exports.update = async(product) => {
    await dynamoDB.send(new UpdateCommand({
        TableName: TABLE,
        Key: { ID: product.ID },
        UpdateExpression: "set #n=:name, price=:price, quantity=:quantity, image=:image",
        ExpressionAttributeNames: {
            "#n": "name"
        },
        ExpressionAttributeValues: {
            ":name": product.name,
            ":price": product.price,
            ":quantity": product.quantity,
            ":image": product.image
        }
    }))
}