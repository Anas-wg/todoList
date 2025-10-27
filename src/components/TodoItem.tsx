// import React from "react";
import type { Todo } from "../model/todo";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <li className="todo-item">
      <input type="checkbox" checked={todo.completed} />
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
        <button>수정</button>
        <button>삭제</button>
      </div>
    </li>
  );
};

export default TodoItem;
