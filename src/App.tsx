import { useState, lazy, Suspense } from "react";
import { useTodoStore } from "./store/todoStore";
import { useShallow } from "zustand/react/shallow";
import { SortKey } from "./hooks/useSortedTodos";
import DayNavigator from "./components/layout/DayNavigator";
import AppHeader from "./components/layout/AppHeader";
import ViewTabs from "./components/layout/ViewTabs";
import TodoList from "./components/todo/TodoList";

// 모달 컴포넌트 lazy loading
const AddTodoModal = lazy(() => import("./components/modal/AddTodoModal"));

function App() {
  const { todos, createTodo } = useTodoStore(
    useShallow((state) => ({
      todos: state.todos,
      createTodo: state.createTodo,
    }))
  );
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("dueDate");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"today" | "all">("today");
  const isTodayView = viewMode === "today";

  return (
    <div className="min-h-screen bg-bg text-fg">
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
        {/* 최상단 Logo 영역 */}
        <AppHeader />
        <main className="space-y-4 md:space-y-6">
          <section className="overflow-hidden">
            {/* 상단 오늘/모든 할 일 탭 컴포넌트 */}
            <ViewTabs
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onSortChange={setSortBy}
            />
            {/* 오늘 탭 - 상단 날짜 이동 로직 컴포넌트 */}
            {isTodayView && (
              <DayNavigator
                date={selectedDate}
                onDateChange={setSelectedDate}
              />
            )}
            {/* 할 일 목록 컴포넌트 */}
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
        {/* 할 일 추가 모달 컴포넌트 */}
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
