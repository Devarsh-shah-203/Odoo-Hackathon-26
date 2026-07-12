import api from "./axios";

export const getVehicles = () => api.get("/vehicles/getAll");
export const getAvailableVehicles = () => api.get("/vehicles/getAvailable");
export const getVehicle = (id) => api.get(`/vehicles/${id}`);
export const createVehicle = (payload) =>
  api.post("/vehicles/create", payload);
export const updateVehicle = (id, payload) =>
  api.patch(`/vehicles/update/${id}`, payload);
export const deleteVehicle = (id) => api.delete(`/vehicles/delete/${id}`);