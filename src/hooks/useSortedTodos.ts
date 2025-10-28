import { useMemo } from "react";
import type { Todo } from "../types/todo";
import { PRIORITY_ORDER } from "../utils/constants";

export type SortKey = "none" | "dueDate" | "priority";

export function useSortedTodos(todos: Todo[], sortBy: SortKey) {
  return useMemo(() => {
    const copy = [...todos];
    if (sortBy === "dueDate") {
      copy.sort((a, b) => {
        const aHas = Boolean(a.dueDate);
        const bHas = Boolean(b.dueDate);
        if (aHas && bHas) {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        if (aHas) return -1;
        if (bHas) return 1;
        return 0;
      });
    } else if (sortBy === "priority") {
      copy.sort(
        (a, b) =>
          (PRIORITY_ORDER[a.priority] ?? 99) -
          (PRIORITY_ORDER[b.priority] ?? 99)
      );
    }
    return copy;
  }, [todos, sortBy]);
}
