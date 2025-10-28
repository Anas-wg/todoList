interface DeleteButtonProps {
  onDelete: () => void;
  size?: "small" | "large";
}

const DeleteButton = ({ onDelete, size = "small" }: DeleteButtonProps) => {
  const sizeClasses = size === "large" ? "text-xl" : "text-base";

  return (
    <button
      type="button"
      aria-label="삭제"
      className={`text-gray-400 hover:text-red-500 flex-shrink-0 leading-none ${sizeClasses}`}
      onClick={onDelete}
    >
      ×
    </button>
  );
};

export default DeleteButton;
