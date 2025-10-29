import { useState } from "react";
import type { CreateTodoData } from "../components/todo/AddTodoForm";
import { isValidDate } from "../utils/dateValidation";

interface FormErrors {
  title?: string;
  description?: string;
  dueDate?: string;
}

interface UseAddTodoFormProps {
  onCreateTodo: (newTodo: CreateTodoData) => void;
}

// 할 일 추가 커스텀 훅
export const useAddTodoForm = ({ onCreateTodo }: UseAddTodoFormProps) => {
  const [formData, setFormData] = useState<CreateTodoData>({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [noDeadline, setNoDeadline] = useState(true);

  // 입력 필드 값 변경 핸들러
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

  // 마감일 없음 체크박스 핸들러
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

  // 입력값 유효성 검증
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

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
      return false;
    }

    return true;
  };

  // 폼 제출 핸들러
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
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

  return {
    formData,
    errors,
    noDeadline,
    handleInputChange,
    handleNoDeadlineChange,
    handleFormSubmit,
  };
};
