const express = require("express");
const path = require("path");
const app = express();
const productCtrl = require("./src/controllers/product.controller");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.set("layout", path.join(__dirname, "src/views/layout"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src/public")));

app.get("/", productCtrl.list);
app.get("/add", productCtrl.showAdd);
app.post("/add", productCtrl.create);
app.get("/edit/:id", productCtrl.showEdit);
app.post("/edit/:id", productCtrl.update);
app.get("/delete/:id", productCtrl.delete);

app.listen(3000, () => {
    console.log("http://localhost:3000");
});