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
    description: "",
    dueDate: "",
    priority: "medium",
  });
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    dueDate?: string;
  }>({});
  const [noDeadline, setNoDeadline] = useState(true);

  const isValidDate = (dateString: string): boolean => {
    if (!dateString) return true; // 빈 값은 허용 (마감일 없음)

    // YYYY-MM-DD 형식 체크
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;

    // 실제 유효한 날짜인지 확인
    const date = new Date(dateString);
    const timestamp = date.getTime();

    if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
      return false;
    }

    // 입력된 날짜와 파싱된 날짜가 일치하는지 확인 (예: 2024-02-30 같은 잘못된 날짜 방지)
    return date.toISOString().startsWith(dateString);
  };

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

    if (name === "description" && value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, description: undefined }));
    }

    if (name === "dueDate") {
      if (!value || isValidDate(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, dueDate: undefined }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dueDate: "올바른 날짜 형식이 아닙니다 (YYYY-MM-DD)",
        }));
      }
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
      setErrors((prevErrors) => ({ ...prevErrors, dueDate: undefined }));
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: {
      title?: string;
      description?: string;
      dueDate?: string;
    } = {};

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "내용을 입력해주세요";
    }

    if (formData.dueDate && !isValidDate(formData.dueDate)) {
      newErrors.dueDate = "올바른 날짜 형식이 아닙니다 (YYYY-MM-DD)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onCreateTodo(formData);

    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
    });
    setErrors({});
    setNoDeadline(true);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white p-4 md:p-6 rounded-lg mb-6 md:mb-8"
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
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="할 일의 상세 내용을 입력하세요"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={4}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

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
          error={errors.dueDate}
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
