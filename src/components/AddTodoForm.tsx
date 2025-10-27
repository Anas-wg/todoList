import React, { useState } from "react";
import type { Todo } from "../model/todo";

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
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("제목은 필수 항목입니다.");
      return;
    }

    onCreateTodo(formData);

    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h3>새로운 할 일 추가</h3>
      <div>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="예: 리액트 공부하기"
          required
        />
      </div>
      <div>
        <label htmlFor="description">내용</label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
          placeholder="예: 5장까지 읽고 예제 실습"
        />
      </div>
      <div>
        <label htmlFor="dueDate">마감일</label>
        <input
          id="dueDate"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="priority">우선순위</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>
      <button type="submit">추가하기</button>
    </form>
  );
};

export default AddTodoForm;
