import React, { useState } from "react";
import type { Todo } from "../model/todo";
import BaseButton from "./common/BaseButton";
import InputField from "./common/InputField";

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
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6 md:mb-8"
    >
      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
        새로운 할 일 추가
      </h3>
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

      <InputField
        id="dueDate"
        name="dueDate"
        type="date"
        value={formData.dueDate}
        onChange={handleInputChange}
        label="마감일"
      />
      <InputField
        id="priority"
        name="priority"
        type={"select" as const}
        value={formData.priority}
        onChange={handleInputChange}
        label="우선순위"
        options={[
          { value: "low", label: "Low", color: "gray" },
          { value: "medium", label: "Medium", color: "sky" },
          { value: "high", label: "High", color: "orange" },
          { value: "urgent", label: "Urgent", color: "red" },
        ]}
      />
      <BaseButton type="submit" variant="z-primary" size="M">
        추가하기
      </BaseButton>
    </form>
  );
};

export default AddTodoForm;
