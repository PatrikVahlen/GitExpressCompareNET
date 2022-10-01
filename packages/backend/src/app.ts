import express, { Application, json, Request, Response } from 'express'
import cors from 'cors'
import TodoItem from '@my-todo-app/shared'
import dotenv from 'dotenv'
import {deleteTodoItem, updateTodoItem, loadAllTodoItems, saveTodoItem, setupMongoDb} from './db'

dotenv.config()

const app: Application = express()
app.use(cors())
app.use(json())
const port : number = parseInt(process.env.SERVER_PORT || '3001')
const mongoURL : string = process.env.MONGODB_URL || 'mongodb://localhost:27017/mytodos'

app.get('/todos', async (req: Request, res: Response<TodoItem[]>) => {
  const todoItems = await loadAllTodoItems()
  console.log('All todos', todoItems)
  res.send(todoItems)
})

app.post("/todos", async (req: Request<TodoItem>, res: Response<TodoItem[]>) => {
  const todoItem = req.body
  const saved = await saveTodoItem(todoItem)
  console.log('Saved todo', saved)
  const todoItems = await loadAllTodoItems()
  console.log('All todos', todoItems)
  res.send(todoItems)
});

app.delete("/todos/:id", async (req: Request<{id: string}>, res: Response<TodoItem[]>) => {
  const id = req.params.id
  const deleted = await deleteTodoItem(id)
  console.log('Deleted todo', deleted)
  const todoItems = await loadAllTodoItems()
  console.log('All todos', todoItems)
  res.send(todoItems)
});

app.put("/todos/:id", async (req: Request<{id: string}>, res: Response<TodoItem[]>) => {
  const id = req.params.id
  const todoItem = req.body
  const updated = await updateTodoItem(id, todoItem)
  console.log('Updated todo', updated)
  const todoItems = await loadAllTodoItems()
  console.log('All todos', todoItems)
  res.send(todoItems)
});


app.listen(port, async function () {
  await setupMongoDb(mongoURL)
  console.log(`App is listening on port ${port}`)
})


