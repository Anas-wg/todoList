import React, { useState } from "react";
import type { Todo } from "../model/todo";
import type { UpdateTodoData } from "../hooks/useTodos";
import DisplayTodoItem from "./DisplayTodoItem";
import EditTodoItem from "./EditTodoItem";

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (id: string, updatedData: UpdateTodoData) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(
    todo.description || ""
  );
  const [editedDueDate, setEditedDueDate] = useState(
    todo.dueDate ? todo.dueDate.toString().split("T")[0] : ""
  );
  const [editedPriority, setEditedPriority] = useState(todo.priority);

  const handleToggleComplete = () => {
    onUpdateTodo(todo.id, { completed: !todo.completed });
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 할 일을 삭제하시겠습니까?")) {
      onDeleteTodo(todo.id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description || "");
    setEditedDueDate(todo.dueDate ? todo.dueDate.toString().split("T")[0] : "");
    setEditedPriority(todo.priority);
  };

  const handleSaveEdit = () => {
    if (!editedTitle.trim()) {
      alert("제목은 필수 항목입니다.");
      return;
    }

    onUpdateTodo(todo.id, {
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate,
      priority: editedPriority,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <EditTodoItem
          editedTitle={editedTitle}
          setEditedTitle={setEditedTitle}
          editedDescription={editedDescription}
          setEditedDescription={setEditedDescription}
          editedDueDate={editedDueDate}
          setEditedDueDate={setEditedDueDate}
          editedPriority={editedPriority}
          setEditedPriority={setEditedPriority}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <DisplayTodoItem
          todo={todo}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </li>
  );
};

export default TodoItem;
