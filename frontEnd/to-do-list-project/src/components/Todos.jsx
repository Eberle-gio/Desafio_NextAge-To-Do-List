import React from "react";

export const Todos = ({ todo }) => {
  return (
    <div className="todo">
      <div className="content">
        <p>{todo.text}</p>
        <p className="category">({todo.category})</p>
      </div>
      <div>
        <button className="completed">Completar</button>
        <button className="remove">excluir</button>
      </div>
    </div>
  );
};

export default Todos;
