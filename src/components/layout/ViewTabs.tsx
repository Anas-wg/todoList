import { SortKey } from "../../hooks/useSortedTodos";

interface ViewTabsProps {
  viewMode: "today" | "all";
  onViewModeChange: (mode: "today" | "all") => void;
  onSortChange: (sortBy: SortKey) => void;
}

const ViewTabs = ({
  viewMode,
  onViewModeChange,
  onSortChange,
}: ViewTabsProps) => {
  const handleViewModeChange = (mode: "today" | "all") => {
    onViewModeChange(mode);
    // 탭 변경 시 정렬도 함께 변경
    if (mode === "today") {
      onSortChange("dueDate");
    } else {
      onSortChange("priority");
    }
  };

  const switchToToday = () => handleViewModeChange("today");
  const switchToAll = () => handleViewModeChange("all");

  return (
    <div className="flex border-b border-border">
      <button
        onClick={switchToToday}
        className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
          viewMode === "today"
            ? "text-brand border-b-2 border-brand bg-brand/5"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        }`}
      >
        오늘
      </button>
      <button
        onClick={switchToAll}
        className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
          viewMode === "all"
            ? "text-brand border-b-2 border-brand bg-brand/5"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        }`}
      >
        모든 할 일
      </button>
    </div>
  );
};

export default ViewTabs;
