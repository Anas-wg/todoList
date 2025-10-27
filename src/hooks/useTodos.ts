import { useState } from "react";
import type { Todo } from "../model/todo";
import type { CreateTodoData } from "../components/AddTodoForm";

export type UpdateTodoData = Partial<Omit<Todo, "id">>;

interface UseTodosResult {
  todos: Todo[];
  createTodo: (todoData: CreateTodoData) => void;
  updateTodo: (id: string, updatedData: UpdateTodoData) => void;
  deleteTodo: (id: string) => void;
}

export const useTodos = (): UseTodosResult => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const createTodo = (todoData: CreateTodoData) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: todoData.title,
      description: todoData.description,
      completed: false,
      priority: todoData.priority,
      dueDate: todoData.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      subtasks: [],
      parentId: null,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodo = (id: string, updatedData: UpdateTodoData) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = {
            ...todo,
            ...updatedData,
            updatedAt: new Date().toISOString(),
          };
          return updatedTodo;
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};
