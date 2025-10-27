import React from "react";
import type { Todo } from "../model/todo";

interface DisplayTodoItemProps {
  todo: Todo;
  onToggleComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const DisplayTodoItem = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}: DisplayTodoItemProps) => {
  return (
    <div className="display-mode">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggleComplete}
      />
      <span className={`todo-title ${todo.completed ? "completed" : ""}`}>
        {todo.title}
      </span>
      {todo.description && (
        <p className="todo-description">{todo.description}</p>
      )}
      {todo.dueDate && (
        <span className="todo-due-date">
          마감일: {todo.dueDate.toString().split("T")[0]}
        </span>
      )}
      <span className="todo-priority">우선순위: {todo.priority}</span>
      <div className="todo-actions">
        <button onClick={onEdit}>수정</button>
        <button onClick={onDelete}>삭제</button>
      </div>
    </div>
  );
};

export default DisplayTodoItem;
