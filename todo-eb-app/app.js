require("dotenv").config();

const express = require("express");
const path = require("path");
const todoRoutes = require("./routes/todoRoutes");

class App {

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.initialize();
  }

  initialize() {

    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "views"));

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, "public")));

    this.app.use("/", todoRoutes);

    this.app.get("/health", (req, res) => {
      res.json({ status: "ok" });
    });

  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`${process.env.APP_NAME} running on port ${this.port}`);
    });
  }

}

const application = new App();
application.start();