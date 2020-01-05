export const userLogged = (to, from, next) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    return next();
  }
  return next("/login");
};
