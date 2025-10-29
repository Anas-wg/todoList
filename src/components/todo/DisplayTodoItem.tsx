import type { Todo } from "../../types/todo";
import { useTodoStore } from "../../store/todoStore";
import PriorityBadge from "../common/PriorityBadge";
import TodoTitle from "./TodoTitle";
import DueDateDisplay from "./DueDateDisplay";
import DeleteButton from "./DeleteButton";
import TodoCheckbox from "./TodoCheckbox";

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
        <TodoCheckbox
          todo={todo}
          onToggle={handleToggleComplete}
          idPrefix="checkbox-mobile"
        />
        <TodoTitle todo={todo} onEdit={onEdit} className="flex-1 min-w-0" />
        {todo.dueDate && (
          <DueDateDisplay dueDate={todo.dueDate} onEdit={onEdit} />
        )}
        <button
          type="button"
          className="cursor-pointer flex-shrink-0"
          onClick={onEdit}
        >
          <PriorityBadge priority={todo.priority} />
        </button>
        <DeleteButton onDelete={onDeleteRequest} />
      </div>

      {/* 태블릿/PC 레이아웃 - 카드 형태 */}
      <>
        {/* 상단: 체크박스 + 제목 + 삭제 버튼 */}
        <div className="hidden md:flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0 py-2">
            <TodoCheckbox
              todo={todo}
              onToggle={handleToggleComplete}
              idPrefix="checkbox-desktop"
            />
            <TodoTitle todo={todo} onEdit={onEdit} className="flex-1 min-w-0" />
          </div>
          <DeleteButton onDelete={onDeleteRequest} size="large" />
        </div>

        {/* 하단: 우선순위와 마감일 */}
        <div className="hidden md:flex items-center justify-between gap-2 mt-auto py-2">
          <button
            type="button"
            className="cursor-pointer flex-shrink-0"
            onClick={onEdit}
          >
            <PriorityBadge priority={todo.priority} />
          </button>
          {todo.dueDate && (
            <DueDateDisplay dueDate={todo.dueDate} onEdit={onEdit} />
          )}
        </div>
      </>
    </>
  );
};

export default DisplayTodoItem;
