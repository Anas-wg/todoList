import type { Todo } from "../../types/todo";
import { useSortedTodos, SortKey } from "../../hooks/useSortedTodos";
import SortBar from "../common/SortBar";
import ListFooter from "../common/ListFooter";
import TodoItem from "./TodoItem";

interface TodoListProps {
  viewMode: "today" | "all";
  sortBy: SortKey;
  onSortChange: (sort: SortKey) => void;
  todos: Todo[];
  selectedDate: Date;
  onAddClick: () => void;
}

const TodoList = ({
  viewMode,
  sortBy,
  onSortChange,
  todos,
  selectedDate,
  onAddClick,
}: TodoListProps) => {
  // 정렬된 할 일 목록
  const sortedTodos = useSortedTodos(todos, sortBy);

  // 필터링된 할 일 목록
  const filteredTodos = sortedTodos.filter((todo) => {
    if (viewMode === "all") return true;
    if (!todo.dueDate) return true;
    const todoDate = new Date(todo.dueDate);
    return todoDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="px-4 md:px-6 pb-2" role="main">
      <div
        className={`flex items-center justify-between mb-4 ${
          viewMode === "all" ? "mt-2" : ""
        }`}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-fg">My Todos</h2>
        <SortBar sortBy={sortBy} onChange={onSortChange} />
      </div>
      <ul
        className="space-y-3 md:space-y-4"
        role="list"
        aria-label="할 일 목록"
      >
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <ListFooter total={filteredTodos.length} onAddClick={onAddClick} />
    </div>
  );
};

export default TodoList;
