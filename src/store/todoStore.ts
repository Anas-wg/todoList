import { create } from "zustand";
import type { Todo } from "../types/todo";
import type { CreateTodoData } from "../components/todo/AddTodoForm";
import { todoApi } from "../api/todoApi";

export type UpdateTodoData = Partial<Omit<Todo, "id">>;

interface TodoStore {
  // 상태
  todos: Todo[];
  isLoading: boolean;
  error: string | null;

  // 액션
  fetchTodos: () => Promise<void>;
  createTodo: (todoData: CreateTodoData) => Promise<void>;
  updateTodo: (id: string, updatedData: UpdateTodoData) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  clearError: () => void;
}

// Zustand 스토어 (API 기반)
export const useTodoStore = create<TodoStore>()((set) => ({
  // 초기 상태
  todos: [],
  isLoading: false,
  error: null,

  // 에러 초기화
  clearError: () => set({ error: null }),

  // 모든 Todo 조회
  fetchTodos: async () => {
    set({ isLoading: true, error: null });
    try {
      const todos = await todoApi.getAllTodos();
      set({ todos, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch todos",
        isLoading: false,
      });
    }
  },

  // Todo 생성
  createTodo: async (todoData) => {
    set({ isLoading: true, error: null });
    try {
      const newTodo = await todoApi.createTodo(todoData);
      set((state) => ({
        todos: [...state.todos, newTodo],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create todo",
        isLoading: false,
      });
      throw error; // UI에서 에러를 처리할 수 있도록 다시 throw
    }
  },

  // Todo 수정
  updateTodo: async (id, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTodo = await todoApi.updateTodo(id, updatedData);
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update todo",
        isLoading: false,
      });
      throw error;
    }
  },

  // Todo 삭제
  deleteTodo: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await todoApi.deleteTodo(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete todo",
        isLoading: false,
      });
      throw error;
    }
  },
}));
