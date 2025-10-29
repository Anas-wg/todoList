import { useState } from "react";
import type { Todo } from "../../types/todo";
import { useTodoStore } from "../../store/todoStore";
import PriorityBadge from "../common/PriorityBadge";
import TodoTitle from "./TodoTitle";
import DueDateDisplay from "./DueDateDisplay";
import DeleteButton from "./DeleteButton";
import TodoCheckbox from "./TodoCheckbox";
import EditIcon from "../common/icons/EditIcon";

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
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  const handleToggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleToggleContent = () => {
    setIsContentExpanded(!isContentExpanded);
  };

  return (
    <>
      {/* 모바일 레이아웃 - 세로 배치로 변경 */}
      <div className="md:hidden">
        <div className="flex items-center gap-2">
          <TodoCheckbox
            todo={todo}
            onToggle={handleToggleComplete}
            idPrefix="checkbox-mobile"
          />
          <button
            type="button"
            onClick={handleToggleContent}
            className="flex-1 min-w-0 text-left"
          >
            <TodoTitle
              todo={todo}
              className="flex-1 min-w-0 pointer-events-none"
            />
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="p-1 text-gray-500 hover:text-blue-600 flex-shrink-0"
            aria-label="수정"
          >
            <EditIcon className="w-4 h-4" />
          </button>
          {todo.dueDate && <DueDateDisplay dueDate={todo.dueDate} />}
          <button
            type="button"
            className="cursor-pointer flex-shrink-0"
            onClick={onEdit}
          >
            <PriorityBadge priority={todo.priority} />
          </button>
          <DeleteButton onDelete={onDeleteRequest} />
        </div>
        {isContentExpanded && todo.description && (
          <div className="mt-2 ml-9 text-sm text-gray-600 whitespace-pre-wrap">
            {todo.description}
          </div>
        )}
      </div>

      {/* 태블릿/PC 레이아웃 - 카드 형태 */}
      <div className="hidden md:flex md:flex-col md:h-full">
        {/* 상단: 체크박스 + 제목 + 수정 버튼 + 삭제 버튼 */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0 py-2">
            <TodoCheckbox
              todo={todo}
              onToggle={handleToggleComplete}
              idPrefix="checkbox-desktop"
            />
            <TodoTitle todo={todo} className="flex-1 min-w-0" />
            <button
              type="button"
              onClick={onEdit}
              className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              aria-label="수정"
            >
              <EditIcon className="w-5 h-5" />
            </button>
          </div>
          <DeleteButton onDelete={onDeleteRequest} size="large" />
        </div>

        {/* 중간: 내용 (항상 공간 확보) */}
        <div className="ml-9 mb-3 text-sm text-gray-600 whitespace-pre-wrap min-h-[1.5rem]">
          {todo.description || ""}
        </div>

        {/* 하단: 우선순위와 마감일 */}
        <div className="flex items-center justify-between gap-2 py-2">
          <PriorityBadge priority={todo.priority} />
          {todo.dueDate && <DueDateDisplay dueDate={todo.dueDate} />}
        </div>
      </div>
    </>
  );
};

export default DisplayTodoItem;
