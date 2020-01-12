export const userLogged = (to, from, next) => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  if (token && email) {
    return next();
  }
  return next("/login");
};
