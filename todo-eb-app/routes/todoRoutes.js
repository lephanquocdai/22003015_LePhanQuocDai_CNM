const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todoController");

router.get("/", (req, res) => todoController.index(req, res));
router.post("/add", (req, res) => todoController.add(req, res));
router.post("/toggle", (req, res) => todoController.toggle(req, res));

module.exports = router;