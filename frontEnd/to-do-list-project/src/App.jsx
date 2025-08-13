import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter.jsx";
import Search from "./components/Search.jsx";
import TodoForm from "./components/TodoForm.jsx";
import Todos from "./components/Todos.jsx";
import Modal from "./components/modal/Modal.jsx";
import api from "./services/api.js";

function App() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const fectchTodos = async () => {
    try {
      const response = await api.get("/api/todos", {
        auth: {
          username: "admin",
          password: "admin",
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefa:", error);
    }
  };

  useEffect(() => {
    fectchTodos();
  }, []);

  const [todos, setTodos] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTodo = (text, category) => {
    const newTodo = [
      ...todos,
      {
        id: Math.floor(Math.random() * 1000),
        text,
        category,
        isCompleted: false,
      },
    ];
    setTodos(newTodo);
  };
  const removeTodo = (id) => {
    const newTodos = [...todos];
    const filteresTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    );
    setTodos(filteresTodos);
  };

  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) =>
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <div>
        <button
          className="filter-button"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          🔃
        </button>

        <button
          className="Search-button"
          onClick={() => setShowSearch((prev) => !prev)}
        >
          🔍
        </button>
      </div>
      {showSearch && <Search search={search} setSearch={setSearch} />}
      {showFilter && (
        <Filter
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />
      )}
      <div className="todo-list">
        {todos
          .filter((todo) =>
            filter === "All"
              ? true
              : filter === "Completed"
              ? todo.isCompleted
              : !todo.isCompleted
          )
          .filter((todo) =>
            todo.title.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) =>
            sort === "Asc"
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text)
          )

          .filter((todo) =>
            filterCategory === "All" ? true : todo.category === filterCategory
          )

          .map((todo) => (
            <Todos
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))}
      </div>
      <button onClick={openModal}>+</button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <TodoForm addTodo={addTodo} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
