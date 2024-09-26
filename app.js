const express = require("express");
const cors = require("cors");
const app = express();
const Todo = require("./models/Todo");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_API_KEY}@cluster0.zt5pw.mongodb.net/`
);

app.use(cors());
app.use(express.json());
app.get("/Todo", async (rec, res) => {
  const todos = await todo.find();
  res.json({ todos: todos });
});

app.post("/add-todo", async (rec, res) => {
  await Todo.create(req.body);
  res.json({ todo: todo });
});
app.post("/edit-item/:id", async (rec, res) => {
  await Todo.findOneAndUpdate({ id: req.params.id }, req.body);
});
app.delete("/DELETE-item/:id", async (rec, res) => {
  await Todo.deleteOne({ id: req.params.id });
});
app.listen(5000, () => {
  console.log("server is running on port 5000");
});
