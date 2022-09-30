import React, { useEffect, useState } from "react";
import TodoItem from '../../shared/src/todo-item';
import "./App.css";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

axios.defaults.baseURL = process.env.REACT_APP_TODO_API || 'http://localhost:3001'

const fetchTodos = async (): Promise<TodoItem[]> => {
  const response = await axios.get<TodoItem[]>('/todos')
  return response.data
}

function App() {
  const [todoText, setTodoText] = useState<string>('')
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [error, setError] = useState<string | undefined>();
  
  const createTodo = async (todoText: string): Promise<void> => {
    const todoItem: TodoItem = {
      text: todoText,
      timeStamp: new Date()
    }
  
  try {
    await axios.post<TodoItem[]>('/todos', todoItem) 
    const response = await axios.get<TodoItem[]>('/todos')
    setTodos(response.data)
    setTodoText('')
  } catch (err) {
    setTodos([])
    setError('Error creating todo')
  }
  }

  const deleteTodo = async (todo: TodoItem): Promise<void> => {
    console.log('delete todo', todo)
    console.log('delete todo', todo._id)
    try {
      await axios.delete<TodoItem[]>(`/todos/${todo._id}`)
      const response = await axios.get<TodoItem[]>('/todos')
      setTodos(response.data)
    } catch (err) {
      setTodos([])
      setError('Error deleting todo')
    }
  }

  
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTodos()
        .then(setTodos)
        .catch((error) => {
          setTodos([])
          setError('Something went wrong while searching for my todos...')
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const output = () => {
    if (error) {
      return (<div>{error}</div>)
    } else if (todos) {
      return (<div>{
        todos.map((item) => {
          return (
            <>
            <div className="Todo">
            <span key={item._id}>{item.text} 
            <button className="Delete_Button" onClick={() => deleteTodo(item)}> < BsTrash/> </button> 
            <button className="Edit_Button"> < AiOutlineEdit/> </button>
            <input type="text" name="popup" id="popup" className="hide"></input> <button name="popup" id="popup" className="hide">Edit</button>
            </span>
            </div>
            </>
          )
        })
        }</div>)
    } else 
      (<div>'Waiting for todos'</div>)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Header">
        My Todo App
        </div>
        <div>
        {output()}
        </div>
      </header>
      <div className="Bottom_Field">
        <input className="Input_Field" type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)}/>
        <br />
        <button className="Create_Button" onClick={(e) => createTodo(todoText)}>Create todo</button>
      </div>
    </div>
  );
}

export default App;
