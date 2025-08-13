export const Todos = ({ todo, removeTodo, completeTodo }) => {
  return (
    <div
      className="todo"
      style={{
        textDecoration: todo.isCompleted ? "line-through" : "",
        backgroundColor: todo.isCompleted ? "#d1d1d1" : "",
      }}
    >
      <div className="content">
        <p>{todo.title}</p>
        <p className="category">({todo.description})</p>
      </div>
      <div>
        <button className="completed" onClick={() => completeTodo(todo.id)}>
          Completar
        </button>
        <button className="remove" onClick={() => removeTodo(todo.id)}>
          excluir
        </button>
        <button className="editar">Editar</button>
      </div>
    </div>
  );
};

export default Todos;
