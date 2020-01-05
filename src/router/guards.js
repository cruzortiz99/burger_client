export const userLogged = (to, from, next) => {
  console.log(from, to);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    return next();
  }
  return next("/login");
};
