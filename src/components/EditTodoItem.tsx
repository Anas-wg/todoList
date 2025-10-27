import React, { useState } from "react";
import type { Todo } from "../model/todo";
import { useTodoStore } from "../store/todoStore";

interface EditTodoItemProps {
  todo: Todo;
  onCancel: () => void;
}

const EditTodoItem = ({ todo, onCancel }: EditTodoItemProps) => {
  const { updateTodo } = useTodoStore();
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(
    todo.description || ""
  );
  const [editedDueDate, setEditedDueDate] = useState(
    todo.dueDate ? todo.dueDate.toString().split("T")[0] : ""
  );
  const [editedPriority, setEditedPriority] = useState(todo.priority);

  const handleSave = () => {
    if (!editedTitle.trim()) {
      alert("제목은 필수 항목입니다.");
      return;
    }

    updateTodo(todo.id, {
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate,
      priority: editedPriority,
    });
    onCancel();
  };

  return (
    <div className="edit-mode">
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />
      <input
        type="date"
        value={editedDueDate}
        onChange={(e) => setEditedDueDate(e.target.value)}
      />
      <select
        value={editedPriority}
        onChange={(e) => setEditedPriority(e.target.value as Todo["priority"])}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
      <button onClick={handleSave}>저장</button>
      <button onClick={onCancel}>취소</button>
    </div>
  );
};

export default EditTodoItem;
