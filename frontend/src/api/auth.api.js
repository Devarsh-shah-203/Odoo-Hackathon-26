import api from "./axios";

export const login = (payload) => api.post("/auth/login", payload);
export const logout = () => api.post("/auth/logout");
export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });
export const verifyOtp = (email, OTP) =>
  api.post("/auth/verify-otp", { email, OTP });
export const resetPassword = (token, password) =>
  api.post(`/auth/reset/${token}`, { password });