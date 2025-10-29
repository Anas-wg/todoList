import type { Todo } from "../../types/todo";

interface TodoTitleProps {
  todo: Todo;
  onEdit?: () => void;
  className?: string;
}

const TodoTitle = ({ todo, onEdit, className = "" }: TodoTitleProps) => {
  const handleClick = () => {
    if (onEdit) onEdit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onEdit) onEdit();
  };

  return (
    <div
      className={`${onEdit ? "cursor-pointer" : ""} ${className}`}
      onClick={onEdit ? handleClick : undefined}
      role={onEdit ? "button" : undefined}
      tabIndex={onEdit ? 0 : undefined}
      aria-label={onEdit ? `할 일 편집: ${todo.title}` : undefined}
      onKeyDown={onEdit ? handleKeyDown : undefined}
    >
      <h3
        className={`text-base font-medium leading-snug ${
          todo.completed ? "line-through text-gray-500" : "text-gray-900"
        }`}
      >
        {todo.title}
      </h3>
    </div>
  );
};

export default TodoTitle;
