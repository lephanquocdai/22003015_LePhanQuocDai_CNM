const express = require('express');
require('dotenv').config();

const app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
const productRoutes = require('./routes/product.routes');
app.use('/', productRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});