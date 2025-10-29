interface DueDateDisplayProps {
  dueDate: string;
  onEdit?: () => void;
}
// 마감일 표시 컴포넌트
const DueDateDisplay = ({ dueDate, onEdit }: DueDateDisplayProps) => {
  const Element = onEdit ? "button" : "span";

  return (
    <Element
      type={onEdit ? "button" : undefined}
      className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0"
      onClick={onEdit}
    >
      {new Date(dueDate).toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
      })}
    </Element>
  );
};

export default DueDateDisplay;
