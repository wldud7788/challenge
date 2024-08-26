import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "../feature/todosSlice";

const store = configureStore({
  reducer: {
    todos: todosSlice,
  },
});

// import { configureStore } from "@reduxjs/toolkit";
// import todosReducer from "../features/todos/todosSlice";

// const store = configureStore({
//   reducer: {
//     todos: todosReducer,
//   },
// });

export default store;
