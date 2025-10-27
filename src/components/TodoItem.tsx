import React, { useState } from 'react'; // Import useState
import type { Todo } from '../model/todo';
import type { UpdateTodoData } from '../hooks/useTodos'; // Import UpdateTodoData type

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (id: string, updatedData: UpdateTodoData) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description || '');
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate ? todo.dueDate.toString().split('T')[0] : '');
  const [editedPriority, setEditedPriority] = useState(todo.priority);

  const handleToggleComplete = () => {
    onUpdateTodo(todo.id, { completed: !todo.completed });
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 할 일을 삭제하시겠습니까?')) {
      onDeleteTodo(todo.id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    // Initialize edit state with current todo values
    setEditedTitle(todo.title);
    setEditedDescription(todo.description || '');
    setEditedDueDate(todo.dueDate ? todo.dueDate.toString().split('T')[0] : '');
    setEditedPriority(todo.priority);
  };

  const handleSaveEdit = () => {
    if (!editedTitle.trim()) {
      alert('제목은 필수 항목입니다.');
      return;
    }

    onUpdateTodo(todo.id, {
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate,
      priority: editedPriority,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset edited state to original todo values
    setEditedTitle(todo.title);
    setEditedDescription(todo.description || '');
    setEditedDueDate(todo.dueDate ? todo.dueDate.toString().split('T')[0] : '');
    setEditedPriority(todo.priority);
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        // Editing mode
        <div className="edit-mode">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value as typeof todo.priority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          <button onClick={handleSaveEdit}>저장</button>
          <button onClick={handleCancelEdit}>취소</button>
        </div>
      ) : (
        // Display mode
        <div className="display-mode">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
          />
          <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </span>
          {todo.description && <p className="todo-description">{todo.description}</p>}
          {todo.dueDate && <span className="todo-due-date">마감일: {todo.dueDate.toString().split('T')[0]}</span>}
          <span className="todo-priority">우선순위: {todo.priority}</span>
          <div className="todo-actions">
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;