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
  const [errors, setErrors] = useState<{ title?: string }>({});

  const handleSave = () => {
    if (!editedTitle.trim()) {
      setErrors({ title: "제목은 필수 항목입니다." });
      return;
    }

    updateTodo(todo.id, {
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate,
      priority: editedPriority,
    });
    onCancel();
    setErrors({});
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
    if (e.target.value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, title: undefined }));
    }
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      <input
        type="text"
        value={editedTitle}
        onChange={handleTitleChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-DEFAULT focus:ring focus:ring-primary-DEFAULT focus:ring-opacity-50"
      />
      {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-DEFAULT focus:ring focus:ring-primary-DEFAULT focus:ring-opacity-50"
      />
      <input
        type="date"
        value={editedDueDate}
        onChange={(e) => setEditedDueDate(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-DEFAULT focus:ring focus:ring-primary-DEFAULT focus:ring-opacity-50"
      />
      <select
        value={editedPriority}
        onChange={(e) => setEditedPriority(e.target.value as Todo["priority"])}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-DEFAULT focus:ring focus:ring-primary-DEFAULT focus:ring-opacity-50"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
      <div className="flex justify-end space-x-2 mt-2">
        <button onClick={handleSave} className="px-3 py-1 rounded-md text-sm font-medium text-white bg-primary-dark hover:bg-primary-DEFAULT">
          저장
        </button>
        <button onClick={onCancel} className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300">
          취소
        </button>
      </div>
    </div>
  );
};

export default EditTodoItem;
