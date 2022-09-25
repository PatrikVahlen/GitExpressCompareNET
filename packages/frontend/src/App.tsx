import React, { useEffect, useState } from "react";
import TodoItem from '../../shared/src/todo-item';
import "./App.css";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3001'

const fetchTodos = async (): Promise<TodoItem> => {
  const response = await axios.get<TodoItem>('/todos')
  return response.data
}

function App() {
  const [todo, setTodo] = useState<TodoItem | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    fetchTodos().then(setTodo).catch((error) => {
      setTodo(undefined)
      setError('Something went wrong while searching for my todos...')
    })
  }, [])

  const output = () => {
    if (error) {
      return (<>{error}</>)
    } else if (todo) {
      return (<>{todo.text}</>)
    } else {<>'Waiting for todos'</>}
  }

  return (
    <div className="App">
      <header className="App-header">
        {output()}
      </header>
    </div>
  );
}


export default App;
