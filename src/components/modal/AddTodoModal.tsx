import AddTodoForm, { CreateTodoData } from "../todo/AddTodoForm";

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTodo: (data: CreateTodoData) => void;
}

const AddTodoModal = ({ isOpen, onClose, onCreateTodo }: AddTodoModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-todo-title"
    >
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full md:w-[700px] max-w-4xl bg-white rounded-2xl md:rounded-xl shadow-xl p-4 md:p-6 max-h-[80vh] overflow-y-auto my-auto">
        <div className="flex items-center justify-between mb-2">
          <h3
            id="add-todo-title"
            className="text-lg md:text-xl font-semibold text-gray-900"
          >
            할 일 추가
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="닫기"
          >
            ×
          </button>
        </div>
        <AddTodoForm
          onCreateTodo={(data) => {
            onCreateTodo(data);
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default AddTodoModal;
