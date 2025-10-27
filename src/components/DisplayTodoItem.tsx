import React from "react";
import type { Todo } from "../model/todo";
import { useTodoStore } from "../store/todoStore";

interface DisplayTodoItemProps {
  todo: Todo;
  onEdit: () => void;
  onDeleteRequest: () => void;
}

const DisplayTodoItem = ({ todo, onEdit, onDeleteRequest }: DisplayTodoItemProps) => {
  const { updateTodo } = useTodoStore();

  const handleToggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  return (
    <div className="display-mode">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
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
        <button onClick={onDeleteRequest}>삭제</button>
      </div>
    </div>
  );
};

export default DisplayTodoItem;
