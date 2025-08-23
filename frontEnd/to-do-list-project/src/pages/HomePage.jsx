import { useEffect, useState } from "react";
import "../App.css";
import Modal from "../components/modal/Modal.jsx";
import Filter from "../components/search-filter/Filter.jsx";
import Search from "../components/search-filter/Search.jsx";
import TodoForm from "../components/todos/TodoForm.jsx";
import Todos from "../components/todos/Todos.jsx";
import {
  completeTodo,
  createTodo,
  deleteTodo,
  fectchTodos,
  updateTodo,
} from "../services/api.js";

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

  const handleComplete = async (todo) => {
    try {
      await completeTodo(todo.id, todo); // chama API
      setTodos((prev) =>
        prev.map((t) =>
          t.id === todo.id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (error) {
      console.error("Erro ao completar tarefa: ", error);
    }
  };

  const editTodo = async (todo) => {
    try {
      const updatedTodo = await updateTodo(todo.id, todo);
      setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <div className="icons">
        <button
          className="filter-button"
          onClick={() => setShowFilter((prev) => !prev)}
        ></button>

        <button
          className="Search-button"
          onClick={() => setShowSearch((prev) => !prev)}
        ></button>

        <div>
          <button className="plus-button" onClick={openModal}></button>
          {isModalOpen && (
            <Modal onClose={closeModal}>
              <TodoForm addTodo={addTodo} onClose={closeModal} />
            </Modal>
          )}
        </div>
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
              ? todo.completed
              : !todo.completed
          )
          .filter((todo) =>
            todo.title.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) =>
            sort === "Asc"
              ? a.title.localeCompare(b.title)
              : sort === "Desc"
              ? b.title.localeCompare(a.title)
              : sort === "CreatedDate"
              ? new Date(a.createdAt) - new Date(b.createdAt)
              : new Date(a.expiryDate) - new Date(b.expiryDate)
          )

          .filter((todo) =>
            filterCategory === "All"
              ? true
              : todo.categoriaNome === filterCategory
          )

          .map((todo) => (
            <Todos
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={handleComplete}
              editTodo={editTodo}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
