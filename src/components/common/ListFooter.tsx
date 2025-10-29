interface ListFooterProps {
  total: number;
  onAddClick: () => void;
}

// 최하단 Task 개수와 할일 추가 버튼
const ListFooter = ({ total, onAddClick }: ListFooterProps) => {
  return (
    <div className="flex items-center justify-between px-2 py-3 mt-4 md:mt-6 text-xs text-gray-400">
      <span>{total} TASKS</span>
      <button
        type="button"
        aria-label="새 할 일 추가"
        className="text-brand font-bold hover:text-brand/80 transition-colors"
        onClick={onAddClick}
      >
        ADD NEW +
      </button>
    </div>
  );
};

export default ListFooter;
