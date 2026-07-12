import api from "./axios";
import { getUsers, getUser, createUser } from "./user.api";

export const getDrivers = async () => {
  const res = await getUsers();
  const data = (res.data || []).filter((u) => u.role === "DRIVER");
  return { ...res, data };
};
export const getDriver = (id) => getUser(id);
export const createDriver = (payload) =>
  createUser({ ...payload, role: "DRIVER" });