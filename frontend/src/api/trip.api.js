import api from "./axios";

export const getTrips = () => api.get("/trips");
export const getTrip = (tripId) => api.get(`/trips/${tripId}`);
export const createTrip = (payload) => api.post("/trips", payload);
export const dispatchTrip = (tripId) =>
  api.patch(`/trips/${tripId}/dispatch`);
export const completeTrip = (tripId, payload) =>
  api.patch(`/trips/${tripId}/complete`, payload);
export const cancelTrip = (tripId) => api.patch(`/trips/${tripId}/cancel`);