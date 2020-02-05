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

export const getEvents = async ({ state, commit }) => {
  const response = await axiosInstance.get(`event/${state.email}`);
  commit("setEvents", response.data);
};

export const saveEvent = async ({ commit }, payload) => {
  const { data } = await axiosInstance.post(`event`, payload);
  commit("setEvents", data);
};
export const updateEvent = async ({ commit }, payload) => {
  const { data } = await axiosInstance.put(`event`, payload);
  commit("setEvents", data);
};
export const deleteEvent = async ({ commit }, payload) => {
  const { data } = await axiosInstance.patch(`event`, payload);
  commit("setEvents", data);
};
