import TodoItem from "@my-todo-app/shared";
import { connect, model, Schema } from "mongoose";

const TodoSchema = new Schema({
  text: String,
  timeStamp: Date,
});

const TodoModel = model<TodoItem>("TodoItem", TodoSchema);

export const setupMongoDb = async (url: string) => {
  await connect(url);
};

export const loadAllTodoItems = async (): Promise<TodoItem[]> => {
  return await TodoModel.find({}).exec();
};

export const saveTodoItem = async (todoItem: TodoItem): Promise<void> => {
  const newModel = new TodoModel(todoItem);
  newModel.save();
};

export const deleteTodoItem = async (id: string): Promise<void> => {
  await TodoModel.deleteOne({ _id: id });
};

export const updateTodoItem = async (
  id: string,
  todoItem: TodoItem
): Promise<void> => {
  await TodoModel.updateOne({ _id: id }, todoItem);
};
