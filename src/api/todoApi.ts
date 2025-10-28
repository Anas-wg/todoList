import type { Todo } from "../types/todo";
import type { CreateTodoData } from "../components/todo/AddTodoForm";
import type { UpdateTodoData } from "../store/todoStore";

const API_BASE_URL = "/api";

// API 에러 처리
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(
      response.status,
      `API Error: ${response.status} ${response.statusText}`
    );
  }

  // 204 No Content는 빈 응답
  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

export const todoApi = {
  // 모든 Todo 조회
  async getAllTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE_URL}/todos`);
    return handleResponse<Todo[]>(response);
  },

  // 특정 Todo 조회
  async getTodoById(id: string): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`);
    return handleResponse<Todo>(response);
  },

  // Todo 생성
  async createTodo(todoData: CreateTodoData): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });
    return handleResponse<Todo>(response);
  },

  // Todo 수정
  async updateTodo(id: string, updates: UpdateTodoData): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "PUT", // 실무에서 더 많이 사용
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    return handleResponse<Todo>(response);
  },

  // Todo 삭제
  async deleteTodo(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
    return handleResponse<void>(response);
  },
};

export { ApiError };
