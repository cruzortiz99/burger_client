import { axiosInstance } from "../../boot/axios";
export function someAction(/* context */) {}

export const login = async ({ commit }, payload) => {
  const response = await axiosInstance.post("login", payload);
  const status = response.status;
  if (status != 200) {
    return status;
  }
  commit("setUserWithToken", response.data);
  return status;
};
