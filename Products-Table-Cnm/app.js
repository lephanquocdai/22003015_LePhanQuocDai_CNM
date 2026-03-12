require("dotenv").config()

const express = require("express")
const app = express()

const productRoutes = require("./routes/productRoutes")

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use("/", productRoutes)

app.listen(3000, () => {
    console.log("Server running http://localhost:3000")
})