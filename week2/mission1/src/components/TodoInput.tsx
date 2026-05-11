import React from 'react'
import { useTodo } from '../context/TodoContext'

const TodoInput = () => {
  const { inputValue, setInputValue, addTodo } = useTodo();

  return (
    <form onSubmit={addTodo} className="todo-container__form">
        <input
          type="text"
          className="todo-container__input"
          placeholder="할 일 입력"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <button type="submit" className="todo-container__button">할 일 추가</button>
    </form>
  )
}

export default TodoInput;