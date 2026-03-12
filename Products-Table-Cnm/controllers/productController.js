const { s3 } = require("../config/aws")
const { PutObjectCommand } = require("@aws-sdk/client-s3")
const model = require("../model/productModel")

exports.uploadImage = async(file) => {

    const key = Date.now() + "_" + file.originalname

    await s3.send(new PutObjectCommand({
        Bucket: "products-table-cnm-tuan10",
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype
    }))

    // return the public URL so callers can store it on the product
    return `https://products-table-cnm-tuan10.s3.ap-southeast-1.amazonaws.com/${key}`
}

// --- controller actions for pages and API --------------------------------------------------

exports.index = async(req, res) => {
    try {
        const products = (await model.getAll()) || []
        const message = req.query.message || null
        res.render("index", { products, message })
    } catch (err) {
        res.status(500).send("Error loading products: " + err.message)
    }
}

exports.search = async(req, res) => {
    const keyword = (req.query.keyword || "").toLowerCase()
    try {
        const all = (await model.getAll()) || []
        const products = all.filter(p => p.name && p.name.toLowerCase().includes(keyword))
        const message = req.query.message || null
        res.render("index", { products, message })
    } catch (err) {
        res.status(500).send("Error searching products: " + err.message)
    }
}

exports.showAddPage = (req, res) => {
    res.render("add")
}

exports.create = async(req, res) => {
    try {
        const { ID, name, price, quantity } = req.body
        let imageUrl = ""
        if (req.file) {
            imageUrl = await exports.uploadImage(req.file)
        }
        await model.create({
            ID,
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            image: imageUrl
        })
        res.redirect("/?message=Thêm sản phẩm thành công!")
    } catch (err) {
        res.status(500).send("Error adding product: " + err.message)
    }
}

exports.showEditPage = async(req, res) => {
    try {
        const product = await model.getById(req.params.id)
        if (!product) return res.status(404).send("Product not found")
        res.render("edit", { product })
    } catch (err) {
        res.status(500).send("Error loading edit page: " + err.message)
    }
}

exports.update = async(req, res) => {
    try {
        const { name, price, quantity } = req.body
        const existing = await model.getById(req.params.id)
        if (!existing) return res.status(404).send("Product not found")
        let imageUrl = existing.image || ""
        if (req.file) {
            imageUrl = await exports.uploadImage(req.file)
        }
        await model.update({
            ID: req.params.id,
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            image: imageUrl
        })
        res.redirect("/?message=Cập nhật sản phẩm thành công!")
    } catch (err) {
        res.status(500).send("Error updating product: " + err.message)
    }
}

exports.delete = async(req, res) => {
    try {
        await model.delete(req.params.id)
        res.redirect("/?message=Xóa sản phẩm thành công!")
    } catch (err) {
        res.status(500).send("Error deleting product: " + err.message)
    }
}