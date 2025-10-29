import type { Todo } from "../../types/todo";
import BaseButton from "../common/BaseButton";
import InputField from "../common/InputField";
import { PRIORITY_OPTIONS } from "../../utils/constants";
import { useAddTodoForm } from "../../hooks/useAddTodoForm";

export type CreateTodoData = Omit<
  Todo,
  "id" | "completed" | "createdAt" | "updatedAt" | "subtasks" | "parentId"
>;

interface AddTodoFormProps {
  onCreateTodo: (newTodo: CreateTodoData) => void | Promise<void>;
}

// 할 일 추가 폼 컴포넌트
const AddTodoForm = ({ onCreateTodo }: AddTodoFormProps) => {
  const {
    formData,
    errors,
    noDeadline,
    handleInputChange,
    handleNoDeadlineChange,
    handleFormSubmit,
  } = useAddTodoForm({ onCreateTodo });

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
