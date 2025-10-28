import { useState, useEffect, lazy, Suspense } from "react";
import { useTodoStore } from "./store/todoStore";
import { SortKey } from "./hooks/useSortedTodos";
import DayNavigator from "./components/layout/DayNavigator";
import AppHeader from "./components/layout/AppHeader";
import ViewTabs from "./components/layout/ViewTabs";
import TodoList from "./components/todo/TodoList";

// 모달 컴포넌트 lazy loading
const AddTodoModal = lazy(() => import("./components/modal/AddTodoModal"));

function App() {
  const { todos, createTodo, fetchTodos, isLoading, error, clearError } =
    useTodoStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("dueDate");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"today" | "all">("today");
  const isTodayView = viewMode === "today";

  // 초기 데이터 로드
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
        {/* 최상단 Logo 영역 */}
        <AppHeader />

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-lg flex items-center justify-between">
            <p className="text-red-800 dark:text-red-200">{error}</p>
            <button
              onClick={clearError}
              className="ml-4 px-3 py-1 text-sm bg-red-200 dark:bg-red-800 hover:bg-red-300 dark:hover:bg-red-700 rounded transition-colors"
            >
              닫기
            </button>
          </div>
        )}

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        <main className="space-y-4 md:space-y-6">
          <section className="overflow-hidden">
            <ViewTabs
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onSortChange={setSortBy}
            />
            {isTodayView && (
              <DayNavigator
                date={selectedDate}
                onDateChange={setSelectedDate}
              />
            )}
            <TodoList
              viewMode={viewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
              todos={todos}
              selectedDate={selectedDate}
              onAddClick={() => setIsAddOpen(true)}
            />
          </section>
        </main>
        {isAddOpen && (
          <Suspense fallback={null}>
            <AddTodoModal
              isOpen={isAddOpen}
              onClose={() => setIsAddOpen(false)}
              onCreateTodo={createTodo}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default App;
