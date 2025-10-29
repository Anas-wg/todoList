import type { Todo } from "../../types/todo";
import CheckIcon from "../common/icons/CheckIcon";

interface TodoCheckboxProps {
  todo: Todo;
  onToggle: () => void;
  idPrefix?: string;
}

// 할 일 완료 체크박스 컴포넌트
const TodoCheckbox = ({
  todo,
  onToggle,
  idPrefix = "checkbox",
}: TodoCheckboxProps) => {
  const checkboxId = `${idPrefix}-${todo.id}`;

  return (
    <div className="relative flex-shrink-0">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        className="sr-only"
        id={checkboxId}
      />
      <label
        htmlFor={checkboxId}
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
  );
};

export default TodoCheckbox;
