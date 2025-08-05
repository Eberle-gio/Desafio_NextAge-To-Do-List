import React from "react";

export const Todos = ({ todo, removeTodo, completeTodo }) => {
  return (
    <div
      className="todo"
      style={{
        textDecoration: todo.isCompleted ? "line-through" : "",
        backgroundColor: todo.isCompleted ? "#ecececff" : "#fff",
      }}
    >
      <div className="content">
        <p>{todo.text}</p>
        <p className="category">({todo.category})</p>
      </div>
      <div>
        <button className="completed" onClick={() => completeTodo(todo.id)}>
          Completar
        </button>
        <button className="remove" onClick={() => removeTodo(todo.id)}>
          excluir
        </button>
      </div>
    </div>
  );
};

export default Todos;
