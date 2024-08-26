// components/TodoList.js

import { useState } from "react";
import { useTodos } from "../context/TodoContext";
import { removeTodo, toggleTodo } from "../feature/todosSlice";

const TodoListContext = () => {
  const [input, setInput] = useState("");
  const { addTodo } = useTodos();

  return (
    <div>
      <h1>Todo List</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={() => addTodo(input)}>Add</button>
      <TodoItemList />
    </div>
  );
};

const TodoItemList = () => {
  const { todos, removeTodo, toggleTodo } = useTodos();
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
          <button onClick={() => removeTodo(todo.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};
export default TodoListContext;
