import "./App.css";
import TodoList from "./component/TodoList";
import TodoListContext from "./component/TodoListContext";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <TodoListContext />
    </TodoProvider>
  );
}

export default App;
