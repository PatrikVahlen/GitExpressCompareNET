import express, { Application, json, Request, Response } from 'express'
import cors from 'cors'
import TodoItem from '../../shared/src/todo-item'

const app: Application = express()
app.use(cors())
app.use(json())
const port : number = parseInt(process.env.SERVER_PORT || '3001')

app.get('/todos', (req: Request, res: Response<TodoItem>) => {
  res.send({
    id: '1',
    text: 'Gå till gymet',
    timeStamp: new Date()
  })
})

app.listen(port, function () {
    console.log(`App is listening on port ${port}!`)
})