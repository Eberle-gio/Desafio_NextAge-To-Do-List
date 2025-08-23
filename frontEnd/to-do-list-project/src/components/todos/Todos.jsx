import { useState } from "react";
import Modal from "../modal/Modal";
import UpdateTodo from "./UpdateTodo";

export const Todos = ({ todo, removeTodo, completeTodo, editTodo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const formateDate = (date) => {
    const [year, month, day] = date.split("-");
    const localDate = new Date(year, month - 1, day);
    return localDate.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const confirmDelete = (id) => {
    setTaskToDelete(id); // abre modal
  };

  const handleConfirmDelete = () => {
    removeTodo(taskToDelete); // chama a função do pai
    setTaskToDelete(null); // fecha modal
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
    // fecha modal
  };

  return (
    <div className={`todo ${todo.completed ? "todocompleted" : ""}`}>
      <div className="content">
        <h4>{todo.title}</h4>
        <p className="category">Categoria: {todo.categoriaNome}</p>
        <p className="description">Descrição: {todo.description}</p>
        <p className="expiryDate">
          Data de vencimento: {formateDate(todo.expiryDate)}
        </p>
        {todo.updatedAt != null && (
          <p>Última atualização: {formateDate(todo.updatedAt)}</p>
        )}
      </div>

      <div>
        <button
          className="completed"
          onClick={() => completeTodo(todo)}
        ></button>

        <button
          onClick={() => confirmDelete(todo.id)}
          className="remove"
        ></button>

        {taskToDelete && (
          <div
            className="modal-remove"
            onClick={handleCancelDelete} // fecha ao clicar no fundo
          >
            <div
              className="modal-content-remove"
              onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
            >
              <p>
                Tem certeza que deseja <strong>excluir</strong> esta tarefa?
              </p>
              <button onClick={handleConfirmDelete}>Sim</button>
              <button onClick={handleCancelDelete}>Não</button>
            </div>
          </div>
        )}

        <button className="edit" onClick={toggleExpanded}></button>
      </div>

      {isExpanded && (
        <Modal onClose={toggleExpanded}>
          <UpdateTodo
            todo={todo}
            onClose={toggleExpanded}
            onUpdate={(updatedTodo) => editTodo(updatedTodo)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Todos;
