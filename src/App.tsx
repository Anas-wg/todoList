import "./App.css";
// import type { Todo } from './model/todo';
import AddTodoForm from "./components/AddTodoForm";
import { useTodos } from "./hooks/useTodos";

function App() {
  // Use the custom hook to manage todos state and logic
  const { todos, createTodo } = useTodos();

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <main>
        {/* Pass the createTodo function from the hook to the form */}
        <AddTodoForm onCreateTodo={createTodo} />
        <section className="todo-list-container">
          <h2>My Todos</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
