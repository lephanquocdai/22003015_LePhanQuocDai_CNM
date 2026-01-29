class ProductDynamoRepository {
    async findAll() {
        return [];
    }

    async findById(id) {
        return null;
    }

    async create(product) {
        return product;
    }

    async update(id, data) {
        return null;
    }

    async delete(id) {
        return true;
    }
}

module.exports = ProductDynamoRepository;