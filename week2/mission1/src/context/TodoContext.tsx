import React, { createContext, useContext, useState, ReactNode } from "react";

type Task = { id: number; text: string; }

interface TodoContextType {
    inputValue: string;
    setInputValue: (val: string) => void;
    todos: Task[];
    doneTasks: Task[];
    addTodo: (e: React.FormEvent) => void;
    completeTask: (task: Task) => void;
    deleteTask: (task: Task) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState<Task[]>([]);
    const [doneTasks, setDoneTasks] = useState<Task[]>([]);

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const newTask = { id: Date.now(), text: inputValue };
        setTodos([...todos, newTask]);
        setInputValue("");
    };

    const completeTask = (task: Task) => {
        setTodos(todos.filter((t) => t.id !== task.id));
        setDoneTasks([...doneTasks, task]);
    };

    const deleteTask = (task: Task) => {
        setDoneTasks(doneTasks.filter((t) => t.id !== task.id));
    };

    return (
        <TodoContext.Provider value={{
            inputValue, setInputValue, todos, doneTasks,
            addTodo, completeTask, deleteTask
        }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) throw new Error("useTodo must be used within a TodoProvider");
    return context;
};