import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter.jsx";
import Search from "./components/Search.jsx";
import TodoForm from "./components/TodoForm.jsx";
import Todos from "./components/Todos.jsx";
import Modal from "./components/modal/Modal.jsx";
import { createTodo, fectchTodos } from "./services/api.js";

function App() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fectchTodos();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, []);

  const [todos, setTodos] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTodo = async (todoData) => {
    try {
      const savedTodo = await createTodo(todoData); // chama a API
      setTodos([...todos, savedTodo]); // adiciona o resultado do backend no estado
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id); // remove no backend
      setTodos(todos.filter((todo) => todo.id !== id)); // atualiza no frontend
    } catch (error) {
      console.error("Erro ao deletar todo:", error);
    }
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
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title)
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
