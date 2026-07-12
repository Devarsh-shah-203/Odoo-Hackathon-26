import api from "./axios";

export const getFuelLogs = () => api.get("/fuel");
export const createFuelLog = (payload) => api.post("/fuel", payload);