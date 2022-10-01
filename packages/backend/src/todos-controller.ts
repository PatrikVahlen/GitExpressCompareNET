import TodoItem from "@my-todo-app/shared";
// import { Request, Response } from "express";
import {
  loadAllTodoItems,
  saveTodoItem,
  deleteTodoItem,
  updateTodoItem,
} from "./db";
import express, { Request, Response } from "express";

const todosController = express.Router();

todosController.get("/", async (req: Request, res: Response<TodoItem[]>) => {
  const todoItems = await loadAllTodoItems();
//   console.log("All todos", todoItems);
  res.send(todoItems);
});

todosController.post(
  "/",
  async (req: Request<TodoItem>, res: Response<TodoItem[]>) => {
    const todoItem = req.body;
    const saved = await saveTodoItem(todoItem);
    // console.log("Saved todo", saved);
    const todoItems = await loadAllTodoItems();
    // console.log("All todos", todoItems);
    res.send(todoItems);
  }
);

todosController.delete(
  "/:id",
  async (req: Request<{ id: string }>, res: Response<TodoItem[]>) => {
    const id = req.params.id;
    const deleted = await deleteTodoItem(id);
    console.log("Deleted todo", deleted);
    const todoItems = await loadAllTodoItems();
    console.log("All todos", todoItems);
    res.send(todoItems);
  }
);

todosController.put(
  "/:id",
  async (req: Request<{ id: string }>, res: Response<TodoItem[]>) => {
    const id = req.params.id;
    const todoItem = req.body;
    const updated = await updateTodoItem(id, todoItem);
    console.log("Updated todo", updated);
    const todoItems = await loadAllTodoItems();
    console.log("All todos", todoItems);
    res.send(todoItems);
  }
);

export default todosController;
