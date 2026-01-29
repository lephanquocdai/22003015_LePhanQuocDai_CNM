const { productRepository } = require("../repositories");
const { v4: uuidv4 } = require("uuid");

class ProductService {
    getAll() {
        return productRepository.findAll();
    }

    getById(id) {
        return productRepository.findById(id);
    }

    create(data) {
        const product = {
            id: uuidv4(),
            name: data.name,
            price: Number(data.price),
            quantity: Number(data.quantity),
            url_image: "https://dummyimage.com/100x100/000/fff&text=New"
        };
        return productRepository.create(product);
    }

    update(id, data) {
        return productRepository.update(id, {
            name: data.name,
            price: Number(data.price),
            quantity: Number(data.quantity)
        });
    }

    delete(id) {
        return productRepository.delete(id);
    }
}

module.exports = new ProductService();