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
    onSortChange(mode === "today" ? "dueDate" : "priority");
  };

  const switchToToday = () => handleViewModeChange("today");
  const switchToAll = () => handleViewModeChange("all");

  return (
    <nav className="flex border-b border-border" aria-label="보기 모드">
      <button
        onClick={switchToToday}
        aria-current={viewMode === "today" ? "page" : undefined}
        className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
          viewMode === "today"
            ? "text-white bg-brand border-b-2 border-brand"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        }`}
      >
        오늘
      </button>
      <button
        onClick={switchToAll}
        aria-current={viewMode === "all" ? "page" : undefined}
        className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
          viewMode === "all"
            ? "text-white bg-brand border-b-2 border-brand"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        }`}
      >
        모든 할 일
      </button>
    </nav>
  );
};

export default ViewTabs;
