import { useState } from "react";

export default function CreateTodo({ addTodo, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [categoriaId, setCategoriaId] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      title,
      description,
      completed: false,
      expiryDate,
      categoriaId,
    });
    onClose(); // fecha o modal
  };

  return (
    <div
      className="create-tasks
    "
    >
      <h1>Criar Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <p>Informe um título</p>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <p>Insira uma descrição</p>
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <p>Informe a data de vencimento</p>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <p>Selecione uma categoria</p>

        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(Number(e.target.value))}
        >
          <option value="">Categorias</option>
          <option value={2}>Estudos</option>
          <option value={3}>Lazer</option>
          <option value={1}>Trabalho</option>
        </select>
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}
