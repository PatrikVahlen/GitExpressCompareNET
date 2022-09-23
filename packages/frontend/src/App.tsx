import React, { useState } from "react";
import TodoItem from '../../shared/src/todo-item'
import "./App.css";

function App() {
  const [todo, setTodo] = useState<TodoItem>({
    id: '123',
    text: 'Städa kontoret',
    timeStamp: new Date(),
  });

  return (
    <div className="App">
      <header className="App-header">
        {todo.text}
      </header>
    </div>
  );
}

export default App;
