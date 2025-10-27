import { useState } from 'react';
import type { Todo } from '../model/todo';
import type { CreateTodoData } from '../components/AddTodoForm';

interface UseTodosResult {
  todos: Todo[];
  createTodo: (todoData: CreateTodoData) => void;
  // 나중에 updateTodo, deleteTodo 등 추가될 수 있습니다.
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

  return {
    todos,
    createTodo,
  };
};
