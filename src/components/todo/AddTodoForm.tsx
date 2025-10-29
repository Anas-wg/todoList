import React, { useState } from "react";
import type { Todo } from "../../types/todo";
import BaseButton from "../common/BaseButton";
import InputField from "../common/InputField";
import { PRIORITY_OPTIONS } from "../../utils/constants";

export type CreateTodoData = Omit<
  Todo,
  "id" | "completed" | "createdAt" | "updatedAt" | "subtasks" | "parentId"
>;

interface AddTodoFormProps {
  onCreateTodo: (newTodo: CreateTodoData) => void;
}

const AddTodoForm = ({ onCreateTodo }: AddTodoFormProps) => {
  const [formData, setFormData] = useState<CreateTodoData>({
    title: "",
    dueDate: "",
    priority: "medium",
  });
  const [errors, setErrors] = useState<{ title?: string }>({});
  const [noDeadline, setNoDeadline] = useState(true);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "title" && value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, title: undefined }));
    }
  };

  const handleNoDeadlineChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setNoDeadline(checked);
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        dueDate: "",
      }));
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setErrors({ title: "제목을 입력해주세요" });
      return;
    }

    onCreateTodo(formData);

    setFormData({
      title: "",
      dueDate: "",
      priority: "medium",
    });
    setErrors({});
    setNoDeadline(true);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6 md:mb-8"
    >
      <InputField
        id="title"
        name="title"
        type="text"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="예: 리액트 공부하기"
        label="제목"
        error={errors.title}
        required
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          마감일
        </label>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="checkbox"
            id="noDeadline"
            checked={noDeadline}
            onChange={handleNoDeadlineChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
          />
          <label
            htmlFor="noDeadline"
            className="text-sm text-gray-700 cursor-pointer select-none"
          >
            마감일 없음
          </label>
        </div>
        <InputField
          id="dueDate"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleInputChange}
          label=""
          disabled={noDeadline}
        />
      </div>
      <InputField
        id="priority"
        name="priority"
        type={"select" as const}
        value={formData.priority}
        onChange={handleInputChange}
        label="우선순위"
        options={PRIORITY_OPTIONS}
      />
      <BaseButton type="submit" variant="z-primary" size="M">
        추가하기
      </BaseButton>
    </form>
  );
};

export default AddTodoForm;
