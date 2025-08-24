import axios from "axios";

export const createApi = (email, password) => {
  const token = btoa(`${email}:${password}`);
  return axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
  });
};
// ----------------------
// Funções que recebem a instância do axios
// ----------------------

const BASE_URL = "http://localhost:8080/users/register"; // ajuste conforme seu backend

export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${BASE_URL}`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const fetchTodos = async (api) => {
  const response = await api.get("/api/tasks");
  return response.data;
};

export const createTodo = async (api, todo) => {
  const response = await api.post("/api/tasks", todo);
  return response.data;
};

export const updateTodo = async (api, id, todo) => {
  const response = await api.put(`/api/tasks/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (api, id) => {
  await api.delete(`/api/tasks/${id}`);
};

export const completeTodo = async (api, id, todo) => {
  const updatedTodo = { ...todo, completed: !todo.completed };
  const response = await api.put(`/api/tasks/${id}`, updatedTodo);
  return response.data;
};
