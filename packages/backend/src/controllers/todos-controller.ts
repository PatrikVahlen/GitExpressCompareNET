import TodoItem from "@my-todo-app/shared";
// import { Request, Response } from "express";
import {
  loadAllTodoItems,
  saveTodoItem,
  deleteTodoItem,
  updateTodoItem,
} from "../models/todos-repository";
import express, { Request, Response } from "express";
import { loadTodos, saveTodo } from "../services/todos-services";

const todosController = express.Router();

todosController.get("/", async (req: Request, res: Response<TodoItem[]>) => {
  // const todoItems = await loadAllTodoItems();
  res.send(await loadTodos());
});

todosController.post(
  "/",
  async (req: Request<TodoItem>, res: Response<TodoItem[]>) => {
    try {
      res.send(await saveTodo(req.body));
    } catch (e) {
      res.sendStatus(400);
    }
  }
);

todosController.delete(
  "/:id",
  async (req: Request<{ id: string }>, res: Response<TodoItem[]>) => {
    const id = req.params.id;
    const deleted = await deleteTodoItem(id);
    const todoItems = await loadAllTodoItems();
    res.send(todoItems);
  }
);

todosController.put(
  "/:id",
  async (req: Request<{ id: string }>, res: Response<TodoItem[]>) => {
    const id = req.params.id;
    const todoItem = req.body;
    const updated = await updateTodoItem(id, todoItem);
    const todoItems = await loadAllTodoItems();
    res.send(todoItems);
  }
);

export default todosController;
