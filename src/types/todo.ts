export type Priority = "low" | "medium" | "high" | "urgent";

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  parentId?: string | null; // Null은 최상위

  title: string;
  description?: string;
  subtasks: Subtask[];

  completed: boolean;
  priority: Priority;
  dueDate: string;

  createdAt: string;
  updatedAt: string;
}
