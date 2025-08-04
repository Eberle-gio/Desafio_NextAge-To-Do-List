import { useState } from "react";
import "./App.css";
import Todos from "./components/Todos.jsx";
import TodoForm from "./components/TodoForm.jsx";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Criar funcionalidade x no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para a academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "estudar react",
      category: "Estudos",
      isCompleted: false,
    },
  ]);

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <div className="todo-list">
        {todos.map((todo) => (
          <Todos todo={todo} />
        ))}
      </div>
      <TodoForm />
    </div>
  );
}

export default App;
