export const PRIORITY_LEVELS = {
  URGENT: "urgent",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;

// 우선순위 옵션 배열 (폼에서 사용)
export const PRIORITY_OPTIONS = [
  { value: PRIORITY_LEVELS.LOW, label: "Low", color: "gray" },
  { value: PRIORITY_LEVELS.MEDIUM, label: "Medium", color: "sky" },
  { value: PRIORITY_LEVELS.HIGH, label: "High", color: "orange" },
  { value: PRIORITY_LEVELS.URGENT, label: "Urgent", color: "red" },
];

// 우선순위 순서 (정렬용)
export const PRIORITY_ORDER = {
  [PRIORITY_LEVELS.URGENT]: 0,
  [PRIORITY_LEVELS.HIGH]: 1,
  [PRIORITY_LEVELS.MEDIUM]: 2,
  [PRIORITY_LEVELS.LOW]: 3,
} as const;

// 우선순위 색상 클래스 (PrioritySelector용)
export const PRIORITY_COLOR_CLASSES = {
  [PRIORITY_LEVELS.URGENT]: {
    base: "bg-priority-urgent hover:bg-pink-300 text-priority-urgent-text",
    selected: "bg-pink-300 ring-2 ring-pink-200 text-priority-urgent-text",
  },
  [PRIORITY_LEVELS.HIGH]: {
    base: "bg-priority-high hover:bg-orange-300 text-priority-high-text",
    selected: "bg-orange-300 ring-2 ring-orange-200 text-priority-high-text",
  },
  [PRIORITY_LEVELS.MEDIUM]: {
    base: "bg-priority-med hover:bg-blue-300 text-priority-med-text",
    selected: "bg-blue-300 ring-2 ring-blue-200 text-priority-med-text",
  },
  [PRIORITY_LEVELS.LOW]: {
    base: "bg-priority-low hover:bg-gray-300 text-priority-low-text",
    selected: "bg-gray-300 ring-2 ring-gray-200 text-priority-low-text",
  },
} as const;
