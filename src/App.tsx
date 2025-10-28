import { useState } from "react";
import AddTodoModal from "./components/modal/AddTodoModal";
import { useTodoStore } from "./store/todoStore";
import TodoItem from "./components/todo/TodoItem";
import { useSortedTodos, SortKey } from "./hooks/useSortedTodos";
import SortBar from "./components/common/SortBar";
import DayNavigator from "./components/layout/DayNavigator";
import ListFooter from "./components/common/ListFooter";
import AppHeader from "./components/layout/AppHeader";
import ViewTabs from "./components/layout/ViewTabs";

function App() {
  const { todos, createTodo } = useTodoStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("dueDate");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"today" | "all">("today");

  const sortedTodos = useSortedTodos(todos, sortBy);

  // 뷰 모드 변경 핸들러
  const handleViewModeChange = (mode: "today" | "all") => {
    setViewMode(mode);
    // 탭 변경 시 정렬도 함께 변경
    if (mode === "today") {
      setSortBy("dueDate");
    } else {
      setSortBy("priority");
    }
  };

  // 뷰 모드에 따라 필터링
  const filteredTodos = sortedTodos.filter((todo) => {
    if (viewMode === "all") return true; // 모든 할 일 보기
    if (!todo.dueDate) return true; // 마감일이 없으면 항상 표시
    const todoDate = new Date(todo.dueDate);
    return todoDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="min-h-screen bg-bg text-fg">
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-2xl">
        {/* 최상단 Logo 영역 */}
        <AppHeader />
        <main className="space-y-4 md:space-y-6">
          <section className="overflow-hidden">
            <ViewTabs
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
            />
            {viewMode === "today" && (
              <DayNavigator
                date={selectedDate}
                onDateChange={setSelectedDate}
              />
            )}
            <div className="px-4 md:px-6 pb-2">
              <div
                className={`flex items-center justify-between mb-4 ${
                  viewMode === "all" ? "mt-2" : ""
                }`}
              >
                <h2 className="text-xl md:text-2xl font-semibold text-fg">
                  My Todos
                </h2>
                <SortBar sortBy={sortBy} onChange={setSortBy} />
              </div>
              <ul className="space-y-3 md:space-y-4">
                {filteredTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </ul>
            </div>
            <ListFooter
              total={filteredTodos.length}
              onAddClick={() => setIsAddOpen(true)}
            />
          </section>
        </main>
        <AddTodoModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onCreateTodo={createTodo}
        />
      </div>
    </div>
  );
}

export default App;
