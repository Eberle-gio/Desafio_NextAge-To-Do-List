import { useState } from "react";
import Modal from "./modal/Modal";
import UpdateTodo from "./updateTodo";

export const Todos = ({ todo, removeTodo, completeTodo, editTodo }) => {
  const [year, month, day] = todo.expiryDate.split("-");
  const localDate = new Date(year, month - 1, day);

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const formatedDate = localDate.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div
      className="todo"
      style={{
        textDecoration: todo.isCompleted ? "line-through" : "",
        backgroundColor: todo.isCompleted ? "#d1d1d1" : "",
      }}
    >
      <div className="content">
        <h4>{todo.title}</h4>
        <p className="category">Categoria: {todo.categoriaNome}</p>
        <p className="description">Descrição: {todo.description}</p>
        <p className="expiryDate">Data de vencimento: {formatedDate}</p>
      </div>
      <div>
        <button
          className="completed"
          onClick={() => completeTodo(todo.id)}
        ></button>
        <button className="remove" onClick={() => removeTodo(todo.id)}></button>

        <button className="edit" onClick={toggleExpanded}></button>
      </div>
      {isExpanded && (
        <Modal onClose={toggleExpanded}>
          <UpdateTodo
            todo={todo}
            onClose={toggleExpanded}
            onUpdate={(updatedTodo) => {
              editTodo(updatedTodo);
            }}
          ></UpdateTodo>
        </Modal>
      )}
    </div>
  );
};

export default Todos;
