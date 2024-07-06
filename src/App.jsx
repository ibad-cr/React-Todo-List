import React, { useState } from 'react';
import './App.css';
import { CiEdit, CiTrash } from 'react-icons/ci';

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const addButton = (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    if (isEditing) {
      setTodoList(
        todoList.map((item) =>
          item.id === currentTodo.id ? { ...item, todo: input } : item
        )
      );
      setIsEditing(false);
      setInput("");
      setCurrentTodo({});
    } else {
      const newTodo = {
        id: Math.random(),
        todo: input.trim(),
      };
      setTodoList([...todoList, newTodo]);
      setInput("");
    }
  };

  const editButton = (todo) => {
    setIsEditing(true);
    setInput(todo.todo);
    setCurrentTodo(todo);
  };

  const deleteButton = (id) => {
    const newList = todoList.filter((item) => item.id !== id);
    setTodoList(newList);
  };

  return (
    <div className="container">
      <div className="todo-app">
        <div>
          <form onSubmit={addButton}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task..."
            />
            <button className="add-button" type="submit">
              {isEditing ? "Edit" : "Add"}
            </button>
          </form>
        </div>
        <ul className="todo-list">
          {todoList.map((item) => (
            <li key={item.id} className="todo-item">
              <div>{item.todo}</div>
              <div className=''>
                <button onClick={() => editButton(item)} className="edit-button">
                  <CiEdit />
                </button>
                <button onClick={() => deleteButton(item.id)} className="delete-button">
                  <CiTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
