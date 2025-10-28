interface DueDateDisplayProps {
  dueDate: string;
  onEdit: () => void;
}

const DueDateDisplay = ({ dueDate, onEdit }: DueDateDisplayProps) => {
  return (
    <button
      type="button"
      className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0"
      onClick={onEdit}
    >
      {new Date(dueDate).toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
      })}
    </button>
  );
};

export default DueDateDisplay;
