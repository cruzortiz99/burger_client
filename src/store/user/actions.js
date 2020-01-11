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
export const updateUserName = ({ commit }, payload) => {
  commit("setUserName", payload);
  throw Error("most comminicate with backend");
};
