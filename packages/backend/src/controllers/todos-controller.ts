import TodoItem from "../interface/todo-items";
import express, { Request, Response } from "express";
import { loadTodos, saveTodo } from "../services/todos-services";

const todosController = express.Router();

todosController.get("/", async (req: Request, res: Response<TodoItem[]>) => {
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

export default todosController;
