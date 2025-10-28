import type { Todo } from "../model/todo";
import { useTodoStore } from "../store/todoStore";
import PriorityBadge from "./common/PriorityBadge";

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
      {/* 모바일: 세로 레이아웃, 데스크톱: 가로 레이아웃 */}
      <div className="flex flex-col md:flex-row md:items-start gap-3">
        {/* 우측 상단 X 삭제 버튼 */}
        <button
          type="button"
          aria-label="삭제"
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          onClick={onDeleteRequest}
        >
          ×
        </button>
        {/* 체크박스와 제목 */}
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            className="mt-1 h-5 w-5 text-fg focus:ring-brand border-border rounded"
          />
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
        </div>

        {/* 메타 정보 (마감일, 우선순위/시간) */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {todo.dueDate && (
            <button
              type="button"
              aria-label="마감일 수정"
              className="text-xs text-gray-400 whitespace-nowrap"
              onClick={onEdit}
            >
              {new Date(todo.dueDate).toLocaleDateString("ko-KR", {
                month: "short",
                day: "numeric",
              })}
            </button>
          )}
          <button
            type="button"
            aria-label="우선순위 수정"
            className="cursor-pointer"
            onClick={onEdit}
          >
            <PriorityBadge priority={todo.priority} />
          </button>
        </div>

        {/* 버튼 제거: 텍스트 터치로 수정, X로 삭제 */}
      </div>
    </div>
  );
};

export default DisplayTodoItem;
