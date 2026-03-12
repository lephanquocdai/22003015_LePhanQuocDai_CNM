const { DynamoDBClient } = require("@aws-sdk/client-dynamodb")
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb")
const { S3Client } = require("@aws-sdk/client-s3")

const dynamoClient = new DynamoDBClient({
    region: process.env.AWS_REGION || "ap-southeast-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

const dynamoDB = DynamoDBDocumentClient.from(dynamoClient)

const s3 = new S3Client({
    region: process.env.AWS_REGION || "ap-southeast-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

module.exports = { dynamoDB, s3 }