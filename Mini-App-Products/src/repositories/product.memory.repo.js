const products = require("../data/product.memory");

class ProductMemoryRepository {
    async findAll() {
        return products;
    }

    async findById(id) {
        return products.find(p => p.id === String(id));
    }

    async create(product) {
        products.push(product);
        return product;
    }

    async update(id, data) {
        const p = products.find(p => p.id === String(id));
        if (!p) return null;
        Object.assign(p, data);
        return p;
    }

    async delete(id) {
        const index = products.findIndex(p => p.id === String(id));
        if (index === -1) return null;
        products.splice(index, 1);
    }
}

module.exports = ProductMemoryRepository;