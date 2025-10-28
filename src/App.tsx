import { useState, lazy, Suspense } from "react";
import { useTodoStore } from "./store/todoStore";
import { SortKey } from "./hooks/useSortedTodos";
import DayNavigator from "./components/layout/DayNavigator";
import AppHeader from "./components/layout/AppHeader";
import ViewTabs from "./components/layout/ViewTabs";
import TodoList from "./components/todo/TodoList";

// 모달 컴포넌트 lazy loading
const AddTodoModal = lazy(() => import("./components/modal/AddTodoModal"));

function App() {
  const { todos, createTodo } = useTodoStore();
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
