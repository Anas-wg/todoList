import { http, HttpResponse, delay } from "msw";
import type { Todo } from "../types/todo";
import type { CreateTodoData } from "../components/todo/AddTodoForm";

// localStorage 동기화 헬퍼 함수
const STORAGE_KEY = "msw-todo-storage";

const loadTodosFromStorage = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load todos from localStorage:", error);
  }
  return [];
};

const saveTodosToStorage = (todos: Todo[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to save todos to localStorage:", error);
  }
};

// 메모리 저장소 (localStorage와 동기화)
let todos: Todo[] = loadTodosFromStorage();

export const handlers = [
  // GET /api/todos - 모든 Todo 조회
  http.get("/api/todos", async () => {
    await delay(300); // 네트워크 지연 시뮬레이션
    // 최신 데이터 로드
    todos = loadTodosFromStorage();
    return HttpResponse.json(todos);
  }),

  // GET /api/todos/:id - 특정 Todo 조회
  http.get("/api/todos/:id", async ({ params }) => {
    await delay(200);
    const { id } = params;
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(todo);
  }),

  // POST /api/todos - Todo 생성
  http.post("/api/todos", async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as CreateTodoData;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: body.title,
      description: body.description,
      completed: false,
      priority: body.priority,
      dueDate: body.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      subtasks: [],
      parentId: null,
    };

    todos = loadTodosFromStorage();
    todos.push(newTodo);
    saveTodosToStorage(todos); // localStorage에 저장
    return HttpResponse.json(newTodo, { status: 201 });
  }),

  // PUT /api/todos/:id - Todo 수정 (실무에서 더 많이 사용)
  http.put("/api/todos/:id", async ({ params, request }) => {
    await delay(300);
    const { id } = params;
    const updates = (await request.json()) as Partial<Todo>;

    todos = loadTodosFromStorage();
    const todoIndex = todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    todos[todoIndex] = {
      ...todos[todoIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    saveTodosToStorage(todos); // localStorage에 저장
    return HttpResponse.json(todos[todoIndex]);
  }),

  // DELETE /api/todos/:id - Todo 삭제
  http.delete("/api/todos/:id", async ({ params }) => {
    await delay(300);
    const { id } = params;

    todos = loadTodosFromStorage();
    const todoIndex = todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    todos.splice(todoIndex, 1);
    saveTodosToStorage(todos); // localStorage에 저장
    return new HttpResponse(null, { status: 204 });
  }),
];
