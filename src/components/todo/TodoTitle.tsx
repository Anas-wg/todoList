import type { Todo } from "../../types/todo";

interface TodoTitleProps {
  todo: Todo;
  onEdit: () => void;
  className?: string;
}

const TodoTitle = ({ todo, onEdit, className = "" }: TodoTitleProps) => {
  return (
    <div
      className={`cursor-pointer ${className}`}
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
          todo.completed ? "line-through text-gray-500" : "text-gray-900"
        }`}
      >
        {todo.title}
      </h3>
    </div>
  );
};

export default TodoTitle;
