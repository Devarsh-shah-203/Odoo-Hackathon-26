import api from "./axios";

export const getTripReport = () => api.get("/reports/trips");
export const getMaintenanceReport = () => api.get("/reports/maintenance");
export const getFuelReport = () => api.get("/reports/fuel");
export const getExpenseReport = () => api.get("/reports/expenses");
export const getFleetSummaryReport = () =>
  api.get("/reports/fleet-summary");