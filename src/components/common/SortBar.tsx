import React from "react";
import type { SortKey } from "../../hooks/useSortedTodos";

interface SortBarProps {
  sortBy: SortKey;
  onChange: (key: SortKey) => void;
}

const SortBar = ({ sortBy, onChange }: SortBarProps) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sortBy" className="text-sm text-fg hidden md:inline">
        정렬
      </label>
      <select
        id="sortBy"
        value={sortBy}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="px-2 py-1 rounded-md border border-border bg-white text-sm"
      >
        <option value="none">기본</option>
        <option value="dueDate">마감일순</option>
        <option value="priority">우선순위순</option>
      </select>
    </div>
  );
};

export default SortBar;
