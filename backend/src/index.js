import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 10);

const app = express();

dotenv.config({
  path: "./env",
});

app.use(express.json());

const SECRET = process.env.SECRET;

connectDB();

// Define mongoose schemas
const todoSchema = new mongoose.Schema({
  todoId: String,
  todoList: [],
});

const userSchema = new mongoose.Schema({
  todo: String,
  name: String,
  password: String,
});

// Define mongoose models
const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

//auth
const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      console.log(user);

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

//routes
app.post("/new", async (req, res) => {
  const { name, password } = req.body;
  // const user = await User.findOne({ username });
  const todo = nanoid();
  console.log("id :", todo);
  const todoList = [];
  const newUser = new User({ todo, name, password });
  await newUser.save();
  const newTodo = new Todo({ todoId: todo, todoList });
  await newTodo.save();
  const token = jwt.sign({ todo, password }, SECRET, { expiresIn: "1h" });
  res.json({ message: "User created successfully", todoId: todo, token });
});

app.get("/:todoId", authenticateJwt, async (req, res) => {
  const todoId = req.params.todoId;
  const todo = await Todo.findOne({ todoId });
  res.json(todo.todoList);
});

app.post("/:todoId", authenticateJwt, async (req, res) => {
  const todo = await Todo.findOne({ todoId: req.params.todoId });
  const { note } = req.body;
  todo.todoList.push(note);
  await todo.save();

  res.json({ message: " Todo inserted!" });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
