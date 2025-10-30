import { useState } from "react";
import type { Todo } from "../../types/todo";
import { useTodoStore } from "../../store/todoStore";
import BaseButton from "../common/BaseButton";
import InputField from "../common/InputField";
import { PRIORITY_OPTIONS } from "../../utils/constants";
import { isValidDate } from "../../utils/dateValidation";

interface EditTodoItemProps {
  todo: Todo;
  onCancel: () => void;
}
// 할 일 수정 폼 컴포넌트
const EditTodoItem = ({ todo, onCancel }: EditTodoItemProps) => {
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(
    todo.description || ""
  );
  const [editedDueDate, setEditedDueDate] = useState(
    todo.dueDate ? todo.dueDate.toString().split("T")[0] : ""
  );
  const [editedPriority, setEditedPriority] = useState(todo.priority);
  const [noDeadline, setNoDeadline] = useState(!todo.dueDate);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    dueDate?: string;
  }>({});

  // 수정 내용 저장 핸들러
  const handleSave = () => {
    const newErrors: {
      title?: string;
      description?: string;
      dueDate?: string;
    } = {};

    if (!editedTitle.trim()) {
      newErrors.title = "제목은 필수 항목입니다.";
    }

    if (!editedDescription.trim()) {
      newErrors.description = "내용을 입력해주세요";
    }

    // 마감일이 있고 유효하지 않은 경우 검증
    if (editedDueDate && !isValidDate(editedDueDate)) {
      newErrors.dueDate =
        "올바른 날짜 형식이 아니거나 (YYYY-MM-DD) 존재하지 않는 날짜입니다.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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

  // 마감일 없음 체크박스 핸들러
  const handleNoDeadlineChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setNoDeadline(checked);
    if (checked) {
      setEditedDueDate("");
      setErrors((prevErrors) => ({ ...prevErrors, dueDate: undefined }));
    }
  };

  // 입력 필드 값 변경 핸들러
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
    } else if (name === "description") {
      setEditedDescription(value);
      if (value.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, description: undefined }));
      }
    } else if (name === "dueDate") {
      setEditedDueDate(value);
      // 마감일 입력 시 실시간 검증
      if (!value || isValidDate(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, dueDate: undefined }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dueDate:
            "올바른 날짜 형식이 아니거나 (YYYY-MM-DD) 존재하지 않는 날짜입니다.",
        }));
      }
    } else if (name === "priority") {
      setEditedPriority(value as Todo["priority"]);
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full md:py-2">
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

      <div>
        <label
          htmlFor="edit-description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="edit-description"
          name="description"
          value={editedDescription}
          onChange={handleInputChange}
          placeholder="할 일의 상세 내용을 입력하세요"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={4}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          마감일
        </label>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="checkbox"
            id="edit-noDeadline"
            checked={noDeadline}
            onChange={handleNoDeadlineChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
          />
          <label
            htmlFor="edit-noDeadline"
            className="text-sm text-gray-700 cursor-pointer select-none"
          >
            마감일 없음
          </label>
        </div>
        <InputField
          id="edit-dueDate"
          name="dueDate"
          type="date"
          value={editedDueDate}
          onChange={handleInputChange}
          label=""
          disabled={noDeadline}
          error={errors.dueDate}
        />
      </div>
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
