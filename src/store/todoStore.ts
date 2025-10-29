import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Todo } from "../types/todo";
import type { CreateTodoData } from "../components/todo/AddTodoForm";

export type UpdateTodoData = Partial<Omit<Todo, "id">>;

interface TodoStore {
  todos: Todo[];
  createTodo: (todoData: CreateTodoData) => void;
  updateTodo: (id: string, updatedData: UpdateTodoData) => void;
  deleteTodo: (id: string) => void;
}

// Zustand  스토어
export const useTodoStore = create<TodoStore>()(
  // 로컬 스토리지에 저장
  persist(
    (set) => ({
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
      // 할 일 업데이트
      updateTodo: (id, updatedData) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, ...updatedData, updatedAt: new Date().toISOString() }
              : todo
          ),
        })),
      // 할 일 삭제
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    {
      // 로컬 스토리지 이름
      name: "todo-storage",
    }
  )
);
