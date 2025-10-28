import type { Todo } from "../../types/todo";
import { useTodoStore } from "../../store/todoStore";
import PriorityBadge from "../common/PriorityBadge";
import CheckIcon from "../common/icons/CheckIcon";

interface DisplayTodoItemProps {
  todo: Todo;
  onEdit: () => void;
  onDeleteRequest: () => void;
}

const DisplayTodoItem = ({
  todo,
  onEdit,
  onDeleteRequest,
}: DisplayTodoItemProps) => {
  const { updateTodo } = useTodoStore();

  const handleToggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  return (
    <div className="w-full">
      {/* 한 줄 레이아웃: 체크박스 - 제목 - 마감일 - 삭제 버튼 */}
      <div className="flex items-center gap-3">
        {/* 체크박스 */}
        <div className="relative flex-shrink-0">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            className="sr-only"
            id={`checkbox-${todo.id}`}
          />
          <label
            htmlFor={`checkbox-${todo.id}`}
            className={`flex items-center justify-center w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200 ${
              todo.completed
                ? "bg-brand border-brand text-white"
                : "bg-white border-gray-300 hover:border-brand hover:bg-gray-50"
            }`}
          >
            {todo.completed && <CheckIcon />}
          </label>
        </div>

        {/* 제목 */}
        <div
          className="flex-1 min-w-0"
          onClick={onEdit}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") onEdit();
          }}
        >
          <span
            className={`text-base font-medium block ${
              todo.completed ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {todo.title}
          </span>
        </div>

        {/* 마감일 */}
        {todo.dueDate && (
          <button
            type="button"
            aria-label="마감일 수정"
            className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0"
            onClick={onEdit}
          >
            {new Date(todo.dueDate).toLocaleDateString("ko-KR", {
              month: "short",
              day: "numeric",
            })}
          </button>
        )}

        {/* 우선순위 */}
        <button
          type="button"
          aria-label="우선순위 수정"
          className="cursor-pointer flex-shrink-0"
          onClick={onEdit}
        >
          <PriorityBadge priority={todo.priority} />
        </button>

        {/* 삭제 버튼 */}
        <button
          type="button"
          aria-label="삭제"
          className="text-gray-400 hover:text-red-500 flex-shrink-0"
          onClick={onDeleteRequest}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default DisplayTodoItem;
