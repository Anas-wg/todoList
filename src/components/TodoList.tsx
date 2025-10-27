import React from 'react';
import type { Todo } from '../model/todo';
import type { UpdateTodoData } from '../hooks/useTodos';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: string, updatedData: UpdateTodoData) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdateTodo, onDeleteTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
