import api from "./axios";

export const getDashboardStats = () => api.get("/dashboard/stats");
export const getRecentTrips = () => api.get("/dashboard/recent-trips");
export const getRecentMaintenance = () =>
  api.get("/dashboard/recent-maintenance");

export const getFleetAnalytics = () => api.get("/analytics/fleet");
export const getTripAnalytics = () => api.get("/analytics/trips");
export const getFuelAnalytics = () => api.get("/analytics/fuel");
export const getMaintenanceAnalytics = () =>
  api.get("/analytics/maintenance");
export const getDriverAnalytics = () => api.get("/analytics/drivers");