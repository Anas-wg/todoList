import { create } from 'zustand';
import type { Todo } from '../model/todo';
import type { CreateTodoData } from '../components/AddTodoForm';

export type UpdateTodoData = Partial<Omit<Todo, 'id'>>;

interface TodoStore {
  todos: Todo[];
  createTodo: (todoData: CreateTodoData) => void;
  updateTodo: (id: string, updatedData: UpdateTodoData) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  createTodo: (todoData) => {
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
    set((state) => ({ todos: [...state.todos, newTodo] }));
  },
  updateTodo: (id, updatedData) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedData, updatedAt: new Date().toISOString() } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
}));
