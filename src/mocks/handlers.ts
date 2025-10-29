import { http, HttpResponse, delay } from "msw";
import type { Todo } from "../types/todo";
import type { CreateTodoData } from "../components/todo/AddTodoForm";

// localStorage 동기화 헬퍼 함수
const STORAGE_KEY = "msw-todo-storage";

// 초기 샘플 데이터
const getInitialTodos = (): Todo[] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  return [
    {
      id: crypto.randomUUID(),
      title: "MSW 환경 구축하기",
      description: "Mock Service Worker로 API 모킹 설정",
      completed: true,
      priority: "high",
      dueDate: today.toISOString().split("T")[0],
      createdAt: new Date(today.getTime() - 3600000).toISOString(),
      updatedAt: new Date().toISOString(),
      subtasks: [],
      parentId: null,
    },
    {
      id: crypto.randomUUID(),
      title: "React Query 학습하기",
      description: "서버 상태 관리 라이브러리 공부",
      completed: false,
      priority: "medium",
      dueDate: tomorrow.toISOString().split("T")[0],
      createdAt: new Date(today.getTime() - 7200000).toISOString(),
      updatedAt: new Date(today.getTime() - 7200000).toISOString(),
      subtasks: [],
      parentId: null,
    },
    {
      id: crypto.randomUUID(),
      title: "TypeScript 고급 타입 마스터하기",
      description: "제네릭, 유틸리티 타입, 조건부 타입 등",
      completed: false,
      priority: "urgent",
      dueDate: today.toISOString().split("T")[0],
      createdAt: new Date(today.getTime() - 10800000).toISOString(),
      updatedAt: new Date(today.getTime() - 10800000).toISOString(),
      subtasks: [],
      parentId: null,
    },
    {
      id: crypto.randomUUID(),
      title: "프로젝트 배포하기",
      description: "Vercel 또는 Netlify에 배포",
      completed: false,
      priority: "low",
      dueDate: nextWeek.toISOString().split("T")[0],
      createdAt: new Date(today.getTime() - 14400000).toISOString(),
      updatedAt: new Date(today.getTime() - 14400000).toISOString(),
      subtasks: [],
      parentId: null,
    },
  ];
};

const loadTodosFromStorage = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load todos from localStorage:", error);
  }
  // localStorage가 비어있으면 초기 샘플 데이터 반환
  const initialTodos = getInitialTodos();
  saveTodosToStorage(initialTodos); // 바로 저장
  return initialTodos;
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
    console.log("todo", todo);

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

  // POST /api/todos/:id - Todo 수정 (POST로 통일)
  http.post("/api/todos/:id", async ({ params, request }) => {
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

  // POST /api/todos/:id/delete - Todo 삭제 (POST로 통일)
  http.post("/api/todos/:id/delete", async ({ params }) => {
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
