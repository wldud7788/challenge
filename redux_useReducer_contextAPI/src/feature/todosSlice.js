import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos", // 슬라이스의 이름 정의
  initialState: {
    todos: [], // todos의 초기상태 정의
  },
  reducers: {
    // 상태를 빈경하는 리듀서를 정의
    addTodo: (state, action) => {
      state.todos.push({
        id: crypto.randomUUID(),
        text: action.payload,
        completed: false, // 새로 할 일은 기본적으로 미완료 상태
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
