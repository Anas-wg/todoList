import React from "react";
import type { Todo } from "../model/todo";
import { useTodoStore } from "../store/todoStore";

interface EditTodoItemProps {
  todoId: string;
  editedTitle: string;
  setEditedTitle: (title: string) => void;
  editedDescription: string;
  setEditedDescription: (description: string) => void;
  editedDueDate: string;
  setEditedDueDate: (dueDate: string) => void;
  editedPriority: Todo["priority"];
  setEditedPriority: (priority: Todo["priority"]) => void;
  onCancel: () => void;
}

const EditTodoItem = ({
  todoId,
  editedTitle,
  setEditedTitle,
  editedDescription,
  setEditedDescription,
  editedDueDate,
  setEditedDueDate,
  editedPriority,
  setEditedPriority,
  onCancel,
}: EditTodoItemProps) => {
  const { updateTodo } = useTodoStore();

  const handleSave = () => {
    if (!editedTitle.trim()) {
      alert("제목은 필수 항목입니다.");
      return;
    }

    updateTodo(todoId, {
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate,
      priority: editedPriority,
    });
    onCancel(); // to exit edit mode
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
