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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Categoria"
        value={categoriaId}
        onChange={(e) => setCategoriaId(Number(e.target.value))}
      />
      <button type="submit">Criar</button>
    </form>
  );
}
