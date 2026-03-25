import React from 'react';
import { useTodo } from '../context/TodoContext';

interface TodoItemProps {
  task: { id: number; text: string };
  type: "doing" | "done"; 
}

const TodoItem = ({ task, type }: TodoItemProps) => {
  const { completeTask, deleteTask } = useTodo(); 
  const isDoing = type === "doing";
  
  return (
    <li className="render-container__item">
      <span>{task.text}</span>
      <button 
        className={`render-container__item-button ${isDoing ? 'complete' : 'delete'}`}
        onClick={() => isDoing ? completeTask(task) : deleteTask(task)}
      > 
        {isDoing ? "완료" : "삭제"}
      </button>
    </li>
  );
};

export default TodoItem; 