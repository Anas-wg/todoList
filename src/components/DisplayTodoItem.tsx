import React from "react";
import type { Todo } from "../model/todo";
import { useTodoStore } from "../store/todoStore";

interface DisplayTodoItemProps {
  todo: Todo;
  onEdit: () => void;
  onDeleteRequest: () => void;
}

const DisplayTodoItem = ({ todo, onEdit, onDeleteRequest }: DisplayTodoItemProps) => {
  const { updateTodo } = useTodoStore();

  const handleToggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  return (
    <div className="flex flex-wrap items-center justify-between w-full">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        className="mr-3 h-5 w-5 text-primary-dark focus:ring-primary-dark border-gray-300 rounded"
      />
      <div className="flex flex-col sm:flex-row sm:items-center flex-grow sm:space-x-4 space-y-1 sm:space-y-0">
        <span className={`text-lg font-medium ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
          {todo.title}
        </span>
        {todo.description && (
          <p className="text-sm text-gray-600">{todo.description}</p>
        )}
        {todo.dueDate && (
          <span className="text-xs text-gray-500">
            마감일: {todo.dueDate.toString().split("T")[0]}
          </span>
        )}
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-DEFAULT text-white">우선순위: {todo.priority}</span>
      </div>
      <div className="flex space-x-2 mt-2 sm:mt-0">
        <button onClick={onEdit} className="bg-green-500 text-white p-2 rounded">
          수정
        </button>
        <button onClick={onDeleteRequest} className="px-3 py-1 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600">
          삭제
        </button>
      </div>
    </div>
  );
};

export default DisplayTodoItem;
