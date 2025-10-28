import { useState } from "react";
import AddTodoModal from "./components/modal/AddTodoModal";
import { useTodoStore } from "./store/todoStore";
import TodoItem from "./components/todo/TodoItem";
import { useSortedTodos, SortKey } from "./hooks/useSortedTodos";
import SortBar from "./components/common/SortBar";
import DayHeader from "./components/layout/DayHeader";
import ListFooter from "./components/common/ListFooter";

function App() {
  const { todos, createTodo } = useTodoStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("dueDate"); // 오늘 탭 기본값: 마감일 순
  const [, setIsEditingAny] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"today" | "all">("today");

  const sortedTodos = useSortedTodos(todos, sortBy);

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
        <header className="bg-brand p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-fg">Todo List</h1>
        </header>
        <main className="space-y-4 md:space-y-6">
          <section className="overflow-hidden">
            {/* 탭 네비게이션 */}
            <div className="flex border-b border-border">
              <button
                onClick={() => {
                  setViewMode("today");
                  setSortBy("dueDate"); // 오늘 탭: 마감일 순
                }}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  viewMode === "today"
                    ? "text-brand border-b-2 border-brand bg-brand/5"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                오늘
              </button>
              <button
                onClick={() => {
                  setViewMode("all");
                  setSortBy("priority"); // 모든 할 일 탭: 우선순위 순
                }}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  viewMode === "all"
                    ? "text-brand border-b-2 border-brand bg-brand/5"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                모든 할 일
              </button>
            </div>

            {/* 날짜 헤더는 오늘 보기일 때만 표시 */}
            {viewMode === "today" && (
              <DayHeader
                date={selectedDate}
                onPrev={() =>
                  setSelectedDate(
                    new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth(),
                      selectedDate.getDate() - 1
                    )
                  )
                }
                onNext={() =>
                  setSelectedDate(
                    new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth(),
                      selectedDate.getDate() + 1
                    )
                  )
                }
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
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onEditingChange={setIsEditingAny}
                  />
                ))}
              </ul>
            </div>
            <ListFooter
              total={filteredTodos.length}
              onAddClick={() => setIsAddOpen(true)}
            />
          </section>
        </main>
        {/* FAB */}
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
