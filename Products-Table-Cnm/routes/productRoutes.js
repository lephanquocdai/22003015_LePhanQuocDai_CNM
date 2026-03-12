const express = require("express")
const multer = require("multer")
const upload = multer()
const router = express.Router()

const controller = require("../controllers/productController")

// list and search
router.get("/", controller.index)
router.get("/search", controller.search)

// add product
router.get("/add", controller.showAddPage)
router.post("/add", upload.single("image"), controller.create)

// edit product
router.get("/edit/:id", controller.showEditPage)
router.post("/edit/:id", upload.single("image"), controller.update)

// delete product
router.post("/delete/:id", controller.delete)

module.exports = router