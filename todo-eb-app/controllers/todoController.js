const todoModel = require("../models/todoModel");

class TodoController {

  async index(req, res) {

    const todos = await todoModel.getAllTodos();

    res.render("index", { todos });
  }

  async add(req, res) {

    const title = req.body.title;

    if (title) {
      await todoModel.addTodo(title);
    }

    res.redirect("/");
  }

  async toggle(req, res) {

    const todoId = req.body.todoId;

    if (todoId) {
      await todoModel.toggleTodo(todoId);
    }

    res.redirect("/");
  }

}

module.exports = new TodoController();