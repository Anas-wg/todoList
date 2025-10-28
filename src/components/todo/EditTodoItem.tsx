import React, { useState } from "react";
import type { Todo } from "../../types/todo";
import { useTodoStore } from "../../store/todoStore";
import BaseButton from "../common/BaseButton";
import InputField from "../common/InputField";
import { PRIORITY_OPTIONS } from "../../utils/constants";

interface EditTodoItemProps {
  todo: Todo;
  onCancel: () => void;
}

const EditTodoItem = ({ todo, onCancel }: EditTodoItemProps) => {
  const { updateTodo } = useTodoStore();
  const [editedTitle, setEditedTitle] = useState(todo.title);
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

      dueDate: editedDueDate,
      priority: editedPriority,
    });
    onCancel();
    setErrors({});
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    if (name === "title") {
      setEditedTitle(value);
      if (value.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, title: undefined }));
      }
    } else if (name === "dueDate") {
      setEditedDueDate(value);
    } else if (name === "priority") {
      setEditedPriority(value as Todo["priority"]);
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <InputField
        id="edit-title"
        name="title"
        type="text"
        value={editedTitle}
        onChange={handleInputChange}
        label="제목"
        error={errors.title}
        required
      />

      <InputField
        id="edit-dueDate"
        name="dueDate"
        type="date"
        value={editedDueDate}
        onChange={handleInputChange}
        label="마감일"
      />
      <InputField
        id="edit-priority"
        name="priority"
        type={"select" as const}
        value={editedPriority}
        onChange={handleInputChange}
        label="우선순위"
        options={PRIORITY_OPTIONS}
      />
      <div className="flex justify-end space-x-2 mt-2">
        <BaseButton onClick={handleSave} variant="z-primary" size="S">
          저장
        </BaseButton>
        <BaseButton onClick={onCancel} variant="z-secondary" size="S">
          취소
        </BaseButton>
      </div>
    </div>
  );
};

export default EditTodoItem;
