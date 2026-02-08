const express = require("express");
const path = require("path");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const ProductController = require("./controllers/productController");

const app = express();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Web Routes (Pages)
app.get("/", ProductController.getProductsPage);
app.get("/add", ProductController.addProductPage);
app.post("/add", ProductController.createProductFromForm);
app.get("/edit/:id", ProductController.editProductPage);
app.post("/edit/:id", ProductController.updateProductFromForm);
app.post("/delete/:id", ProductController.deleteProduct);

// API Routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
