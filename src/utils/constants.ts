/**
 * 애플리케이션 상수들
 */

export const PRIORITY_LEVELS = {
  URGENT: "urgent",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;

export const PRIORITY_LABELS = {
  [PRIORITY_LEVELS.URGENT]: "긴급",
  [PRIORITY_LEVELS.HIGH]: "높음",
  [PRIORITY_LEVELS.MEDIUM]: "보통",
  [PRIORITY_LEVELS.LOW]: "낮음",
} as const;

export const PRIORITY_COLORS = {
  [PRIORITY_LEVELS.URGENT]: "red",
  [PRIORITY_LEVELS.HIGH]: "orange",
  [PRIORITY_LEVELS.MEDIUM]: "yellow",
  [PRIORITY_LEVELS.LOW]: "green",
} as const;

export const SORT_OPTIONS = {
  NONE: "none",
  DUE_DATE: "dueDate",
  PRIORITY: "priority",
} as const;

export const SORT_LABELS = {
  [SORT_OPTIONS.NONE]: "정렬 없음",
  [SORT_OPTIONS.DUE_DATE]: "마감일 순",
  [SORT_OPTIONS.PRIORITY]: "우선순위 순",
} as const;

export const VIEW_MODES = {
  TODAY: "today",
  ALL: "all",
} as const;

export const VIEW_MODE_LABELS = {
  [VIEW_MODES.TODAY]: "오늘",
  [VIEW_MODES.ALL]: "모든 할 일",
} as const;
