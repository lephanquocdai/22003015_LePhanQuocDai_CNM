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

module.exports = router;