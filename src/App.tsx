import "./App.css";
import AddTodoForm from "./components/AddTodoForm";
import { useTodos } from "./hooks/useTodos";
import TodoItem from "./components/TodoItem";

function App() {
  const { todos, createTodo, updateTodo, deleteTodo } = useTodos();

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <main>
        <AddTodoForm onCreateTodo={createTodo} />
        <section className="todo-list-container">
          <h2>My Todos</h2>
          <ul>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdateTodo={updateTodo}
                onDeleteTodo={deleteTodo}
              />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
