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
    <>
      {/* 모바일 레이아웃 - 가로 배치 */}
      <div className="flex items-center gap-3 md:hidden">
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
            aria-label={`할 일 ${todo.completed ? "완료 취소" : "완료"}`}
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
          className="flex-1 min-w-0 lg:py-5"
          onClick={onEdit}
          role="button"
          tabIndex={0}
          aria-label={`할 일 편집: ${todo.title}`}
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

      {/* 태블릿/PC 레이아웃 - 카드 형태 */}
      <>
        {/* 상단: 체크박스 + 제목 + 삭제 버튼 */}
        <div className="hidden md:flex items-center justify-between gap-3 mb-3">
          {/* 왼쪽: 체크박스 + 제목 */}
          <div className="flex items-center gap-3 flex-1 min-w-0 py-2">
            {/* 체크박스 */}
            <div className="relative flex-shrink-0">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggleComplete}
                className="sr-only"
                id={`checkbox-md-${todo.id}`}
              />
              <label
                htmlFor={`checkbox-md-${todo.id}`}
                aria-label={`할 일 ${todo.completed ? "완료 취소" : "완료"}`}
                className={`flex items-center justify-center w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200 ${
                  todo.completed
                    ? "bg-brand border-brand text-white"
                    : "bg-white border-gray-300 hover:border-brand hover:bg-gray-50"
                }`}
              >
                {todo.completed && <CheckIcon />}
              </label>
            </div>

            {/* 제목 - 클릭 가능한 영역 */}
            <div
              className="flex-1 min-w-0 cursor-pointer"
              onClick={onEdit}
              role="button"
              tabIndex={0}
              aria-label={`할 일 편집: ${todo.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter") onEdit();
              }}
            >
              <h3
                className={`text-base font-medium leading-snug ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
              >
                {todo.title}
              </h3>
            </div>
          </div>

          {/* 오른쪽: 삭제 버튼 */}
          <button
            type="button"
            aria-label="삭제"
            className="text-gray-400 hover:text-red-500 flex-shrink-0 text-xl leading-none"
            onClick={onDeleteRequest}
          >
            ×
          </button>
        </div>

        {/* 하단: 우선순위와 마감일 */}
        <div className="hidden md:flex items-center justify-between gap-2 mt-auto py-2">
          {/* 우선순위 */}
          <button
            type="button"
            className="cursor-pointer flex-shrink-0"
            onClick={onEdit}
          >
            <PriorityBadge priority={todo.priority} />
          </button>

          {/* 마감일 */}
          {todo.dueDate && (
            <button
              type="button"
              className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0"
              onClick={onEdit}
            >
              {new Date(todo.dueDate).toLocaleDateString("ko-KR", {
                month: "short",
                day: "numeric",
              })}
            </button>
          )}
        </div>
      </>
    </>
  );
};

export default DisplayTodoItem;
