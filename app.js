const express = require("express");
const cors = require("cors");
const app = express();
const Todo = require("./models/Todo");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_API_KEY}@cluster0.zt5pw.mongodb.net/`
);

const corsOptions = {
  Access-Control-Allow-Origin: "https://unga-todo.netlify.app"
  Access-Control-Allow-Credentials: true
  // origin: "https://unga-todo.netlify.app", // Replace with your Netlify app URL
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.get("/todo", (req, res) => {
  res.json({ message: "CORS enabled!" });
});

app.post("/add-todo", async (rec, res) => {
  await Todo.create(req.body);
  res.json({ todo: todo });
});

app.post("/edit-item/:id", async (rec, res) => {
  await Todo.findOneAndUpdate({ id: req.params.id }, req.body);
  res.json({ message: "Item updated successfully" });
});

app.delete("/DELETE-item/:id", async (rec, res) => {
  await Todo.deleteOne({ id: req.params.id });
  res.json({ message: "Item deleted successfully" });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
