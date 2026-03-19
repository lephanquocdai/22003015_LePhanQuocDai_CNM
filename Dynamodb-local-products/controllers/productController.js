// controllers/productController.js
const ProductModel = require('../models/productModel');
const upload = require('../config/uploadS3'); // Multer-S3 config
const path = require('path');

const ProductController = {
    // ===== API: Create product =====
    createProduct: async(req, res) => {
        try {
            const { id, name, price, unit_in_stock, url_image } = req.body;

            if (!id || !name || price === undefined || unit_in_stock === undefined) {
                return res.status(400).json({ message: 'Missing fields' });
            }

            const product = {
                id,
                name,
                price: parseFloat(price),
                unit_in_stock: parseInt(unit_in_stock, 10),
                url_image: url_image || '',
            };

            await ProductModel.create(product);
            res.json({ message: 'Product created successfully', product });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // ===== API: Get all products =====
    getProducts: async(req, res) => {
        try {
            const data = await ProductModel.getAll();
            let products = data.Items || [];
            if (req.query.q) {
                const q = req.query.q.toLowerCase();
                products = products.filter((p) => p.name.toLowerCase().includes(q));
            }
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // ===== API: Get product by ID =====
    getProductById: async(req, res) => {
        try {
            const data = await ProductModel.getById(req.params.id);
            if (!data.Item) return res.status(404).json({ message: 'Product not found' });
            res.json(data.Item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // ===== API: Update product =====
    updateProduct: async(req, res) => {
        try {
            const { name, price, unit_in_stock, url_image } = req.body;
            await ProductModel.update(req.params.id, {
                name,
                price: parseFloat(price),
                unit_in_stock: parseInt(unit_in_stock, 10),
                url_image: url_image || '',
            });
            res.json({ message: 'Product updated successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // ===== API: Delete product =====
    deleteProduct: async(req, res) => {
        try {
            await ProductModel.delete(req.params.id);
            res.json({ message: 'Product deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // ===== Web page: List products =====
    getProductsPage: async(req, res) => {
        try {
            const data = await ProductModel.getAll();
            let products = (data.Items || []).sort((a, b) => a.name.localeCompare(b.name));

            const query = (req.query.q || '').trim();
            if (query) {
                products = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
            }

            res.render('products', { products, message: req.query.message || null, q: query });
        } catch (err) {
            res.status(500).render('products', { products: [], message: 'Error loading products: ' + err.message, q: '' });
        }
    },

    // ===== Web page: Add product =====
    addProductPage: async(req, res) => {
        res.render('add', { error: null, form: {} });
    },

    // ===== Web page: Create product from form with S3 =====
    createProductFromForm: async(req, res) => {
        try {
            const file = req.file;
            const imagePath = file ? file.location : req.body.url_image || '';

            if (!req.body.name || !req.body.price || !req.body.unit_in_stock) {
                return res.render('add', { error: 'Name, price and stock are required.', form: req.body });
            }

            const product = {
                id: `PROD-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`,
                name: req.body.name.trim(),
                price: parseFloat(req.body.price),
                unit_in_stock: parseInt(req.body.unit_in_stock, 10),
                url_image: imagePath,
            };

            await ProductModel.create(product);
            res.redirect('/?message=Product added successfully');
        } catch (err) {
            res.render('add', { error: 'Error creating product: ' + err.message, form: req.body });
        }
    },

    // ===== Web page: Edit product =====
    editProductPage: async(req, res) => {
        try {
            const data = await ProductModel.getById(req.params.id);
            if (!data.Item) return res.status(404).send('Product not found');
            res.render('edit', { product: data.Item, error: null });
        } catch (err) {
            res.status(500).send('Error loading edit page: ' + err.message);
        }
    },

    // ===== Web page: Update product from form with S3 =====
    updateProductFromForm: async(req, res) => {
        try {
            const id = req.params.id;
            const file = req.file;
            const existingData = await ProductModel.getById(id);
            if (!existingData.Item) return res.status(404).send('Product not found');

            let finalImage = existingData.Item.url_image || '';
            if (file) finalImage = file.location;
            else if (req.body.url_image && req.body.url_image.trim()) finalImage = req.body.url_image.trim();

            await ProductModel.update(id, {
                name: req.body.name.trim(),
                price: parseFloat(req.body.price),
                unit_in_stock: parseInt(req.body.unit_in_stock, 10),
                url_image: finalImage,
            });

            res.redirect('/?message=Product updated successfully');
        } catch (err) {
            const data = await ProductModel.getById(req.params.id);
            res.render('edit', { product: data.Item || {}, error: 'Error updating product: ' + err.message });
        }
    },

    // ===== Web page: Detail product =====
    detailProductPage: async(req, res) => {
        try {
            const data = await ProductModel.getById(req.params.id);
            if (!data.Item) return res.status(404).send('Product not found');
            res.render('detail', { product: data.Item });
        } catch (err) {
            res.status(500).send('Error loading detail page: ' + err.message);
        }
    },
};

module.exports = ProductController;