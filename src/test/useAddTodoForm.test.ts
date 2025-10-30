import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

import type { CreateTodoData } from "../components/todo/AddTodoForm";
import { useAddTodoForm } from "../hooks/useAddTodoForm";

// 헬퍼: 폼 데이터 입력
function fillFormData(
  hook: ReturnType<typeof useAddTodoForm>,
  data: Partial<CreateTodoData>
) {
  if (data.title !== undefined) {
    act(() => {
      hook.handleInputChange({
        target: { name: "title", value: data.title },
      } as React.ChangeEvent<HTMLInputElement>);
    });
  }

  if (data.description !== undefined) {
    act(() => {
      hook.handleInputChange({
        target: { name: "description", value: data.description },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });
  }

  if (data.dueDate !== undefined) {
    act(() => {
      hook.handleInputChange({
        target: { name: "dueDate", value: data.dueDate },
      } as React.ChangeEvent<HTMLInputElement>);
    });
  }
}

// 헬퍼: 폼 제출 시도
function submitForm(hook: ReturnType<typeof useAddTodoForm>) {
  act(() => {
    hook.handleFormSubmit({
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent);
  });
}

describe("할 일 추가 폼의 날짜 검증", () => {
  let mockOnCreateTodo: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnCreateTodo = vi.fn();
  });

  describe("잘못된 날짜를 입력하면 할 일이 추가되지 않는다", () => {
    it("슬래시 구분자를 사용한 날짜를 거부한다", () => {
      const { result } = renderHook(() =>
        useAddTodoForm({ onCreateTodo: mockOnCreateTodo })
      );

      fillFormData(result.current, {
        title: "할 일",
        description: "설명",
        dueDate: "2025/10/29",
      });

      // 날짜 에러가 있어야 함
      expect(result.current.errors.dueDate).toBeDefined();

      submitForm(result.current);

      // 할 일이 추가되지 않아야 함
      expect(mockOnCreateTodo).not.toHaveBeenCalled();
    });

    it("존재하지 않는 날짜(2월 30일)를 거부한다", () => {
      const { result } = renderHook(() =>
        useAddTodoForm({ onCreateTodo: mockOnCreateTodo })
      );

      fillFormData(result.current, {
        title: "할 일",
        description: "설명",
        dueDate: "2025-02-30",
      });

      expect(result.current.errors.dueDate).toBeDefined();
      submitForm(result.current);
      expect(mockOnCreateTodo).not.toHaveBeenCalled();
    });

    it("존재하지 않는 월(13월)을 거부한다", () => {
      const { result } = renderHook(() =>
        useAddTodoForm({ onCreateTodo: mockOnCreateTodo })
      );

      fillFormData(result.current, {
        title: "할 일",
        description: "설명",
        dueDate: "2025-13-01",
      });

      expect(result.current.errors.dueDate).toBeDefined();
      submitForm(result.current);
      expect(mockOnCreateTodo).not.toHaveBeenCalled();
    });

    it("평년의 2월 29일을 거부한다", () => {
      const { result } = renderHook(() =>
        useAddTodoForm({ onCreateTodo: mockOnCreateTodo })
      );

      fillFormData(result.current, {
        title: "할 일",
        description: "설명",
        dueDate: "2025-02-29", // 2025년은 평년
      });

      expect(result.current.errors.dueDate).toBeDefined();
      submitForm(result.current);
      expect(mockOnCreateTodo).not.toHaveBeenCalled();
    });
  });

  describe("올바른 날짜를 입력하면 할 일이 추가된다", () => {
    it("유효한 날짜로 할 일을 생성한다", () => {
      const { result } = renderHook(() =>
        useAddTodoForm({ onCreateTodo: mockOnCreateTodo })
      );

      fillFormData(result.current, {
        title: "할 일",
        description: "설명",
        dueDate: "2025-10-29",
      });

      expect(result.current.errors.dueDate).toBeUndefined();
      submitForm(result.current);

      expect(mockOnCreateTodo).toHaveBeenCalledWith({
        title: "할 일",
        description: "설명",
        dueDate: "2025-10-29",
        priority: "medium",
      });
    });

    it("마감일 없이도 할 일을 생성한다", () => {
      const { result } = renderHook(() =>
        useAddTodoForm({ onCreateTodo: mockOnCreateTodo })
      );

      fillFormData(result.current, {
        title: "할 일",
        description: "설명",
      });

      expect(result.current.formData.dueDate).toBe("");
      expect(result.current.errors.dueDate).toBeUndefined();
      submitForm(result.current);

      expect(mockOnCreateTodo).toHaveBeenCalledWith({
        title: "할 일",
        description: "설명",
        dueDate: "",
        priority: "medium",
      });
    });

    it("윤년의 2월 29일로 할 일을 생성한다", () => {
      const { result } = renderHook(() =>
        useAddTodoForm({ onCreateTodo: mockOnCreateTodo })
      );

      fillFormData(result.current, {
        title: "할 일",
        description: "설명",
        dueDate: "2024-02-29", // 2024년은 윤년
      });

      expect(result.current.errors.dueDate).toBeUndefined();
      submitForm(result.current);

      expect(mockOnCreateTodo).toHaveBeenCalledWith({
        title: "할 일",
        description: "설명",
        dueDate: "2024-02-29",
        priority: "medium",
      });
    });
  });
});
