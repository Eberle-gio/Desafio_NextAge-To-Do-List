import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  auth: {
    username: "admin",
    password: "admin",
  },
});

export const fectchTodos = async () => {
  const response = await api.get("/api/tasks");
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await api.post(`/api/tasks`, todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await api.put(`/api/tasks${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  await api.delete(`/api/tasks${id}`);
};
