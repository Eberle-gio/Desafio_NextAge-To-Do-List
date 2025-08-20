import { useState } from "react";

export default function UpdateTodo({ todo, onClose, onUpdate }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [expiryDate, setExpiryDate] = useState(todo.expiryDate);
  const [categoriaId, setCategoriaId] = useState(todo.categoriaId);

  const handleSave = () => {
    onUpdate({ ...todo, title, description, categoriaId, expiryDate });
    onClose();
  };

  return (
    <div className="expanded-todo-overlay">
      <div className="expanded-todo">
        <button className="close-button" onClick={onClose}>
          X
        </button>

        <h2>Editar Tarefa</h2>

        <label>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Descrição:
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Categoria:
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          >
            <option value={2}>Estudos</option>
            <option value={3}>Lazer</option>
            <option value={1}>Trabalho</option>
          </select>
        </label>

        <label>
          Data de Vencimento:
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          ></input>
        </label>

        <button onClick={handleSave}>Salvar</button>
      </div>
    </div>
  );
}
