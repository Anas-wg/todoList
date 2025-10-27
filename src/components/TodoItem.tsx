import React, { useState } from "react";
import type { Todo } from "../model/todo";
import DisplayTodoItem from "./DisplayTodoItem";
import EditTodoItem from "./EditTodoItem";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <EditTodoItem todo={todo} onCancel={handleCancelEdit} />
      ) : (
        <DisplayTodoItem todo={todo} onEdit={handleEdit} />
      )}
    </li>
  );
};

export default TodoItem;
