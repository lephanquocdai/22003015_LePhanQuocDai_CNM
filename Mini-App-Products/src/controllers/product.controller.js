const productService = require("../services/product.service");

exports.list = async(req, res) => {
    const searchQuery = req.query.search || '';
    let products = await productService.getAll();

    if (searchQuery) {
        products = products.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    res.render("products", { products, search: searchQuery });
};

exports.showAdd = (req, res) => {
    res.render("add");
};

exports.create = async(req, res) => {
    await productService.create(req.body);
    res.redirect("/");
};

exports.showEdit = async(req, res) => {
    const product = await productService.getById(req.params.id);
    res.render("edit", { product });
};

exports.update = async(req, res) => {
    await productService.update(req.params.id, req.body);
    res.redirect("/");
};

exports.delete = async(req, res) => {
    await productService.delete(req.params.id);
    res.redirect("/");
};