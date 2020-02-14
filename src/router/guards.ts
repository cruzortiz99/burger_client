import { Route } from 'vue-router';

export const userLogged = (to: Route, from: Route, next: Function) => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  if (token && email) {
    return next();
  }
  return next('/login');
};
