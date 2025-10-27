import React from "react";
import type { Todo } from "../model/todo";
import { useTodoStore } from "../store/todoStore";

interface DisplayTodoItemProps {
  todo: Todo;
  onEdit: () => void;
}

const DisplayTodoItem = ({ todo, onEdit }: DisplayTodoItemProps) => {
  const { updateTodo, deleteTodo } = useTodoStore();

  const handleToggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 할 일을 삭제하시겠습니까?")) {
      deleteTodo(todo.id);
    }
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
        <button onClick={handleDelete}>삭제</button>
      </div>
    </div>
  );
};

export default DisplayTodoItem;
