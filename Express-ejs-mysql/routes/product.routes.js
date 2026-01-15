const express = require('express');
const router = express.Router();
const db = require('../db/mysql');

// Hiển thị danh sách sản phẩm
router.get('/', async(req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products');
        res.render('products', { products });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Thêm sản phẩm
router.post('/add', async(req, res) => {
    const { name, price, quantity } = req.body;
    try {
        await db.query(
            'INSERT INTO products(name, price, quantity) VALUES (?, ?, ?)', [name, price, quantity]
        );
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Tìm kiếm sản phẩm
router.get('/search', async(req, res) => {
    const { q } = req.query;
    try {
        const [products] = await db.query('SELECT * FROM products WHERE name LIKE ?', [`%${q}%`]);
        res.render('products', { products });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Hiển thị form chỉnh sửa sản phẩm
router.get('/edit/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const [products] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        if (products.length > 0) {
            res.render('formProducts', { product: products[0] });
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Cập nhật sản phẩm
router.post('/update/:id', async(req, res) => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    try {
        await db.query(
            'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?', [name, price, quantity, id]
        );
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Xóa sản phẩm
router.post('/delete/:id', async(req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM products WHERE id = ?', [id]);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;