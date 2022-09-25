import express, { Application, json, Request, Response } from 'express'
import cors from 'cors'
import TodoItem from '../../shared/src/todo-item'
import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

const app: Application = express()
app.use(cors())
app.use(json())
const port : number = parseInt(process.env.SERVER_PORT || '3001')

const TODO_ITEMS: TodoItem[] = [
  {id: crypto.randomUUID(), text: 'Hello World', timeStamp: new Date()}
]

app.get('/todos', (req: Request, res: Response<TodoItem[]>) => {
  res.send(TODO_ITEMS)
})

app.post("/todos", (req: Request<TodoItem>, res: Response<TodoItem[]>) => {
  const todoItem = req.body
  todoItem.id = crypto.randomUUID()
  console.log('Got a new todo item', todoItem)
  TODO_ITEMS.push(todoItem)
  res.send(TODO_ITEMS)
});

app.listen(port, function () {
    console.log(`App is listening on port ${port}!`)
})