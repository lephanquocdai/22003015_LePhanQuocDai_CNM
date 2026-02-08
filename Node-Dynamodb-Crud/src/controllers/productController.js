const ProductModel = require("../models/productModel");

const ProductController = {
  createProduct: async (req, res) => {
    try {
      const { id, name, price, url_image } = req.body;

      if (!id || !name || !price || !url_image) {
        return res.status(400).json({ message: "Missing fields" });
      }

      await ProductModel.create({ id, name, price, url_image });
      res.json({ message: "Product created successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getProducts: async (req, res) => {
    try {
      const data = await ProductModel.getAll();
      res.json(data.Items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await ProductModel.getById(id);

      if (!data.Item) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(data.Item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, url_image } = req.body;

      await ProductModel.update(id, { name, price, url_image });

      res.json({ message: "Product updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      await ProductModel.delete(id);
      
      // If request expects JSON, return JSON
      if (req.accepts("json")) {
        res.json({ message: "Product deleted successfully" });
      } else {
        // Redirect to home page if form submission
        res.redirect("/");
      }
    } catch (err) {
      if (req.accepts("json")) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).send("Error deleting product");
      }
    }
  },

  // Web Views Methods
  getProductsPage: async (req, res) => {
    try {
      const data = await ProductModel.getAll();
      const products = data.Items || [];
      const message = req.query.message || null;
      
      res.render("products", { products, message });
    } catch (err) {
      res.status(500).render("products", { 
        products: [], 
        message: "Error loading products: " + err.message 
      });
    }
  },

  addProductPage: async (req, res) => {
    try {
      res.render("add", { error: null });
    } catch (err) {
      res.status(500).send("Error loading add page: " + err.message);
    }
  },

  createProductFromForm: async (req, res) => {
    try {
      const { name, price, url_image } = req.body;

      // Validation
      if (!name || !price) {
        return res.render("add", { 
          error: "Name and Price are required",
          name,
          price,
          url_image
        });
      }

      // Generate unique ID
      const id = "PROD-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);

      await ProductModel.create({ 
        id, 
        name, 
        price: parseFloat(price), 
        url_image: url_image || "" 
      });

      res.redirect("/?message=Product created successfully!");
    } catch (err) {
      res.render("add", { 
        error: "Error creating product: " + err.message,
        name: req.body.name,
        price: req.body.price,
        url_image: req.body.url_image
      });
    }
  },

  editProductPage: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await ProductModel.getById(id);

      if (!data.Item) {
        return res.status(404).send("Product not found");
      }

      res.render("edit", { product: data.Item, error: null });
    } catch (err) {
      res.status(500).send("Error loading edit page: " + err.message);
    }
  },

  updateProductFromForm: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, url_image } = req.body;

      // Validation
      if (!name || !price) {
        const data = await ProductModel.getById(id);
        return res.render("edit", { 
          product: data.Item,
          error: "Name and Price are required"
        });
      }

      await ProductModel.update(id, { 
        name, 
        price: parseFloat(price), 
        url_image: url_image || "" 
      });

      res.redirect("/?message=Product updated successfully!");
    } catch (err) {
      const data = await ProductModel.getById(id);
      res.render("edit", { 
        product: data.Item,
        error: "Error updating product: " + err.message
      });
    }
  },
};

module.exports = ProductController;
