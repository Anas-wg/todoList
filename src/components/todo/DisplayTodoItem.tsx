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

// 할 일 표시 컴포넌트
const DisplayTodoItem = ({
  todo,
  onEdit,
  onDeleteRequest,
}: DisplayTodoItemProps) => {
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleToggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleToggleContent = () => {
    setIsContentExpanded(!isContentExpanded);
  };

  const handleToggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
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
          <div
            className={`mt-2 ml-9 text-sm whitespace-pre-wrap break-words ${
              todo.completed ? "line-through text-gray-400" : "text-gray-600"
            }`}
          >
            {todo.description}
          </div>
        )}
      </div>

      <div className="hidden md:flex md:flex-col md:h-full">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0 py-2">
            <TodoCheckbox
              todo={todo}
              onToggle={handleToggleComplete}
              idPrefix="checkbox-desktop"
            />
            <div className="flex-1 min-w-0">
              <h3
                className={`text-base font-medium leading-snug ${
                  isDescriptionExpanded ? "" : "line-clamp-1"
                } ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
                title={todo.title}
              >
                {todo.title}
              </h3>
            </div>
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

        <div className="ml-9 mb-3 flex-1">
          {todo.description ? (
            <>
              <div
                className={`text-sm whitespace-pre-wrap break-words h-5 overflow-hidden ${
                  isDescriptionExpanded ? "h-auto" : ""
                } ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-600"
                }`}
              >
                {todo.description}
              </div>
              <div className="h-6 flex items-start mt-1">
                {(todo.description.length > 100 || todo.title.length > 30) && (
                  <button
                    type="button"
                    onClick={handleToggleDescription}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    {isDescriptionExpanded ? "접기" : "더보기"}
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="h-5" />
              <div className="h-6 mt-1">
                {todo.title.length > 30 && (
                  <button
                    type="button"
                    onClick={handleToggleDescription}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    {isDescriptionExpanded ? "접기" : "더보기"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 py-2 mt-auto">
          <PriorityBadge priority={todo.priority} />
          {todo.dueDate && <DueDateDisplay dueDate={todo.dueDate} />}
        </div>
      </div>
    </>
  );
};

export default DisplayTodoItem;
