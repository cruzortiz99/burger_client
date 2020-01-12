import { axiosInstance } from "../../boot/axios";

export const login = async ({ commit }, payload) => {
  const response = await axiosInstance.post("login", payload);
  const status = response.status;
  if (status != 200) {
    return status;
  }
  commit("setUserWithToken", response.data);
  return status;
};
export const updateUserName = async ({ state, commit }, payload) => {
  commit("setUserName", payload);
  const user = {
    name: state.userName,
    email: state.email,
    password: state.password
  };
  const response = await axiosInstance.post(`user/${state.email}`, user);
  return response.status === 200;
};

export const getUserName = async ({ commit }, payload) => {
  const response = await axiosInstance.get(`user/${payload}`);
  commit("setUserName", response.data.name);
};
