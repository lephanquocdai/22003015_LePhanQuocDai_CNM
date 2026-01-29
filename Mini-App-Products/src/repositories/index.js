const ProductMemoryRepository = require("./product.memory.repo");
const ProductDynamoRepository = require("./product.dynamo.repo");

const useMemory = process.env.USE_MEMORY_DB === "true";

module.exports = {
    productRepository: useMemory ?
        new ProductMemoryRepository() :
        new ProductDynamoRepository()
};