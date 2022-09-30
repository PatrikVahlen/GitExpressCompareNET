import express, { Application, json, Request, Response } from 'express'
import cors from 'cors'
import TodoItem from '../../shared/src/todo-item'
import crypto from 'crypto'
import dotenv from 'dotenv'
import {readFile, writeFile} from 'fs'
import {loadAllTodoItems, saveTodoItem, setupMongoDb} from './db'

dotenv.config()

const app: Application = express()
app.use(cors())
app.use(json())
const port : number = parseInt(process.env.SERVER_PORT || '3001')
const mongoURL : string = process.env.MONGO_URL || 'mongodb://localhost:27017/mytodos'

const TODO_FILE = process.env.TODO_FILE || 'todos.json'
let TODO_ITEMS: TodoItem[] = []

readFile(TODO_FILE, (err, data) => {
    if (err) throw err
    TODO_ITEMS = JSON.parse(data.toString()) as unknown as TodoItem[]
    console.log('Loaded ' + TODO_ITEMS.length + ' todo items', TODO_ITEMS)
})
   
function writeTodosToFile(todoItems:TodoItem[]) {
    writeFile(TODO_FILE, JSON.stringify(todoItems), (err) => {
      console.error('Error writing todos to file', err)   
})
}

app.get('/todos', (req: Request, res: Response<TodoItem[]>) => {
  res.send(TODO_ITEMS)
})

app.post("/todos", (req: Request<TodoItem>, res: Response<TodoItem[]>) => {
  const todoItem = req.body
  todoItem.id = crypto.randomUUID()
  console.log('Got a new todo item', todoItem)
  TODO_ITEMS.push(todoItem)
  writeTodosToFile(TODO_ITEMS)
  res.send(TODO_ITEMS)
});

app.delete("/todos/:id", (req: Request<{id: string}>, res: Response<TodoItem[]>) => {
  const id = req.params.id
  console.log('Deleting todo item with id', id)
  TODO_ITEMS = TODO_ITEMS.filter(item => item.id !== id)
  writeTodosToFile(TODO_ITEMS)
  res.send(TODO_ITEMS)
});

app.put("/todos/:id", (req: Request<{id: string}>, res: Response<TodoItem[]>) => {
  const id = req.params.id
  const todoItem = req.body
  console.log('Updating todo item with id', id, todoItem)
  TODO_ITEMS = TODO_ITEMS.map(item => item.id === id ? todoItem : item)
  writeTodosToFile(TODO_ITEMS)
  res.send(TODO_ITEMS)
});


app.listen(port, async function () {
  await setupMongoDb(mongoURL)
  console.log(`App is listening on port ${port}`)
})


// app.listen(port, function () {
//     console.log(`App is listening on port ${port}!`)
// })