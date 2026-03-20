import React from 'react';
import TodoItem from './TodoItem';
import { useTodo } from '../context/TodoContext';

interface TodoListProps {
    title: "할 일" | "완료";
}

const TodoList = ({ title }: TodoListProps) => {
  const { todos, doneTasks } = useTodo();
  const isDoing = title === "할 일";
  const currentTasks = isDoing ? todos : doneTasks;

  return (
    <div className="render-container__section">
        <h2 className="render-container__title">{title}</h2>
        <ul className="render-container__list">
          {currentTasks.map((task) => (
              <TodoItem
                  key={task.id}
                  task={task}
                  type={isDoing ? "doing" : "done"}
              />
          ))}
        </ul>
    </div>
  );
};

export default TodoList; 