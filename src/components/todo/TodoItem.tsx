import { useState } from "react";
import type { Todo } from "../../types/todo";
import DisplayTodoItem from "./DisplayTodoItem";
import EditTodoItem from "./EditTodoItem";
import ConfirmationModal from "../modal/ConfirmationModal";
import { useTodoStore } from "../../store/todoStore";

interface TodoItemProps {
  todo: Todo;
  onEditingChange?: (editing: boolean) => void;
}

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
    <li className="py-3 border-b border-gray-100 last:border-b-0">
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
        <ConfirmationModal
          isOpen={showDeleteModal}
          title="할 일 삭제"
          message="정말로 이 할 일을 삭제하시겠습니까?"
          onConfirm={handleConfirmDelete}
          onClose={handleCancelDelete}
        />
      )}
    </li>
  );
};

export default TodoItem;
