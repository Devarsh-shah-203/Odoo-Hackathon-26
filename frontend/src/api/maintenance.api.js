import api from "./axios";

export const getMaintenance = () => api.get("/maintenance");
export const getMaintenanceById = (id) => api.get(`/maintenance/${id}`);
export const createMaintenance = (payload) =>
  api.post("/maintenance", payload);
export const completeMaintenance = (id) =>
  api.patch(`/maintenance/${id}/complete`);