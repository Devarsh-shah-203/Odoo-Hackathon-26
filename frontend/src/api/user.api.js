import api from "./axios";

// Fleet manager user management endpoints (backend: /api/manager)
export const getUsers = () => api.get("/manager/getAll");
export const getUser = (id) => api.get(`/manager/update/${id}`);
export const createUser = (payload) => api.post("/manager/create", payload);
export const updateUser = (id, payload) =>
  api.patch(`/manager/update/${id}`, payload);
export const deleteUser = (id) => api.delete(`/manager/update/${id}`);