import { State } from 'src/@types/models';

export function getter(/*state*/) {}

export const userName = (state: State) => {
  return state.userName;
};

export const email = (state: State) => {
  return state.email;
};

export const events = (state: State) => {
  return state.events;
};

export const token = (state: State) => {
  return state.token;
};
