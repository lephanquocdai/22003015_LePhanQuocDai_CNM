const express = require('express');
const ProductController = require('../controllers/productController');
const upload = require('../config/uploadS3'); // import Multer-S3

const router = express.Router();

// Web pages
router.get('/', ProductController.getProductsPage);
router.get('/search', ProductController.getProductsPage);
router.get('/add', ProductController.addProductPage);
router.post('/add', upload.single('image'), ProductController.createProductFromForm);
router.get('/edit/:id', ProductController.editProductPage);
router.post('/edit/:id', upload.single('image'), ProductController.updateProductFromForm);
router.post('/delete/:id', ProductController.deleteProductFromForm);
router.get('/detail/:id', ProductController.detailProductPage);

// API
router.post('/api/products', ProductController.createProduct);
router.get('/api/products', ProductController.getProducts);
router.get('/api/products/:id', ProductController.getProductById);
router.put('/api/products/:id', ProductController.updateProduct);
router.delete('/api/products/:id', ProductController.deleteProduct);

module.exports = router;