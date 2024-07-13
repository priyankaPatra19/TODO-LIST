import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
});
const [newTodo, setNewTodo] = useState("");
const [editIndex, setEditIndex] = useState(null);

useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

const handleAddOrUpdateTodo = () => {
    if (newTodo.trim()) {
        if (editIndex !== null) {
            const updatedTodos = todos.map((todo, index) =>
                index === editIndex ? { ...todo, text: newTodo.trim() } : todo
            );
            setTodos(updatedTodos);
            setEditIndex(null);
        } else {
            setTodos([...todos, { text: newTodo.trim(), completed: false }]);
        }
        setNewTodo("");
    }
};

const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
};

const handleCompleteTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
};

const handleEditTodo = (index) => {
    setNewTodo(todos[index].text);
    setEditIndex(index);
};
  return (
    <div className="app">
            <h1 className="title">Todo List</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task"
                    className="input"
                />
                <button onClick={handleAddOrUpdateTodo} className="button">
                    {editIndex !== null ? "Update" : "Add"}
                </button>
            </div>
            <ul className="todo-list">
                {todos.map((todo, index) => (
                    <li key={index} className={`todo-item ${todo.completed ? "completed" : ""}`}>
                        <span
                            onClick={() => handleCompleteTodo(index)}
                            className="todo-text"
                        >
                            {todo.text}
                        </span>
                        <div className="actions">
                            <button onClick={() => handleEditTodo(index)} className="edit-button">Edit</button>
                            <button onClick={() => handleDeleteTodo(index)} className="delete-button">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
  );
}

export default App;
