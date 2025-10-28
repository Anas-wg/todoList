interface ListFooterProps {
  total: number;
  onAddClick: () => void;
}

const ListFooter = ({ total, onAddClick }: ListFooterProps) => {
  return (
    <div className="flex items-center justify-between px-2 py-3 mt-4 md:mt-6 text-xs text-gray-400">
      <span>{total} TASKS</span>
      <button
        type="button"
        aria-label="새 할 일 추가"
        className="text-gray-500 hover:text-gray-700"
        onClick={onAddClick}
      >
        ADD NEW +
      </button>
    </div>
  );
};

export default ListFooter;
