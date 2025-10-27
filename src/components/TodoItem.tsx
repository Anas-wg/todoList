import React, { useState } from "react";
import type { Todo } from "../model/todo";
import DisplayTodoItem from "./DisplayTodoItem";
import EditTodoItem from "./EditTodoItem";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(
    todo.description || ""
  );
  const [editedDueDate, setEditedDueDate] = useState(
    todo.dueDate ? todo.dueDate.toString().split("T")[0] : ""
  );
  const [editedPriority, setEditedPriority] = useState(todo.priority);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description || "");
    setEditedDueDate(todo.dueDate ? todo.dueDate.toString().split("T")[0] : "");
    setEditedPriority(todo.priority);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <EditTodoItem
          todoId={todo.id}
          editedTitle={editedTitle}
          setEditedTitle={setEditedTitle}
          editedDescription={editedDescription}
          setEditedDescription={setEditedDescription}
          editedDueDate={editedDueDate}
          setEditedDueDate={setEditedDueDate}
          editedPriority={editedPriority}
          setEditedPriority={setEditedPriority}
          onCancel={handleCancelEdit}
        />
      ) : (
        <DisplayTodoItem todo={todo} onEdit={handleEdit} />
      )}
    </li>
  );
};

export default TodoItem;
