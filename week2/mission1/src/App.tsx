import React from "react";
import './assets/style.css';
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext"; 

function App() {
  return (
    <TodoProvider>
      <div className="todo-container">
        <h1 className="todo-container__header">UMC TODO</h1>
        <TodoInput />
        <div className="render-container">
          <TodoList title="할 일" />
          <TodoList title="완료" />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;