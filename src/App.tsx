import AddTodoForm from "./components/AddTodoForm";
import { useTodoStore } from "./store/todoStore";
import TodoItem from "./components/TodoItem";

function App() {
  const { todos, createTodo } = useTodoStore();

  return (
    <div className="min-h-screen bg-primary-lightest text-gray-800 flex flex-col items-center py-8">
      <header className="w-full max-w-2xl bg-primary-DEFAULT p-4 rounded-lg shadow-md mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">Todo List</h1>
      </header>
      <main className="w-full max-w-2xl">
        <AddTodoForm onCreateTodo={createTodo} />
        <section className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary-dark">My Todos</h2>
          <ul className="space-y-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
              />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
