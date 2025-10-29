import { useState, memo, lazy, Suspense } from "react";
import type { Todo } from "../../types/todo";
import DisplayTodoItem from "./DisplayTodoItem";
import EditTodoItem from "./EditTodoItem";
import { useTodoStore } from "../../store/todoStore";

// 모달 컴포넌트 lazy loading
const ConfirmationModal = lazy(() => import("../modal/ConfirmationModal"));

interface TodoItemProps {
  todo: Todo;
  onEditingChange?: (editing: boolean) => void;
}

// 할 일 아이템 컴포넌트
const TodoItem = ({ todo, onEditingChange }: TodoItemProps) => {
  const { deleteTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    onEditingChange?.(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    onEditingChange?.(false);
  };

  const handleDeleteRequest = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteTodo(todo.id);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <li
      className={`py-3 border-b border-gray-100 last:border-b-0 md:py-0 md:border-b-0 md:bg-white md:rounded-lg md:shadow-sm md:hover:shadow-md md:transition-shadow md:duration-200 md:p-4 md:border md:border-gray-100 md:flex md:flex-col ${
        !isEditing ? "md:min-h-[140px]" : "md:h-auto"
      }`}
    >
      {isEditing ? (
        <EditTodoItem todo={todo} onCancel={handleCancelEdit} />
      ) : (
        <DisplayTodoItem
          todo={todo}
          onEdit={handleEdit}
          onDeleteRequest={handleDeleteRequest}
        />
      )}

      {showDeleteModal && (
        // 모달은 초기 로딩시 필요 없으니 Suspense
        <Suspense fallback={null}>
          <ConfirmationModal
            isOpen={showDeleteModal}
            title="할 일 삭제"
            message="정말로 이 할 일을 삭제하시겠습니까?"
            onConfirm={handleConfirmDelete}
            onClose={handleCancelDelete}
          />
        </Suspense>
      )}
    </li>
  );
};

export default memo(TodoItem);
