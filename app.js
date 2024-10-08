const express = require("express");
const cors = require("cors");
const app = express();
const Todo = require("./models/Todo");
const mongoose = require("mongoose");
const corsOptions = {
  origin: "https://unga-todo.netlify.app", // Replace with your Netlify app URL
  optionsSuccessStatus: 200,
};
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_API_KEY}@cluster0.zt5pw.mongodb.net/`
);

app.use(cors(corsOptions));
app.use(express.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://unga-todo.netlify.app");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,OPTIONS,PATCH,DELETE,POST,PUT"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   if (req.method === "OPTIONS") {
//     res.status(200).end();
//     return;
//   }
//   next();
// });

app.get("/todo", async (req, res) => {
  const todos = await Todos.find(); // Fetch all documents from the 'Todos' collection
  res.json({ todos: todos }); // Send the todos as a JSON response

});

app.post("/add-todo", async (req, res) => {
  const newToDo = await Todo.create(req.body);
  res.json(newToDo);
});

app.post("/edit-item/:id", async (req, res) => {
  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { text: req.body.text, completed: req.body.completed } }, // Update both task and completed status
    { new: true }
  );
  res.json(updatedTodo);
});
app.delete("/delete-item/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id });
  res.json({ message: "Item deleted successfully" });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
