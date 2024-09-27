const express = require("express");
const cors = require("cors");
const app = express();
const Todo = require("./models/Todo");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_API_KEY}@cluster0.zt5pw.mongodb.net/`
);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/Todo", async (rec, res) => {
  const todos = await Todo.find();
  res.json({ todos: todos }).set("Access-Control-Allow-Origin", "*");
});

app.post("/add-todo", async (rec, res) => {
  await Todo.create(req.body);
  res.json({ todo: todo }).set("Access-Control-Allow-Origin", "*");
});

app.post("/edit-item/:id", async (rec, res) => {
  await Todo.findOneAndUpdate({ id: req.params.id }, req.body);
  res
    .json({ message: "Item updated successfully" })
    .set("Access-Control-Allow-Origin", "*");
});

app.delete("/DELETE-item/:id", async (rec, res) => {
  await Todo.deleteOne({ id: req.params.id });
  res
    .json({ message: "Item deleted successfully" })
    .set("Access-Control-Allow-Origin", "*");
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
