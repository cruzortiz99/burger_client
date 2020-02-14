import {
  State,
  User,
  Event,
  EventsLocation,
  UserWithToken
} from 'src/@types/models';

export const setUserName = (state: State, payload: string) => {
  state.userName = payload;
};

export const setEmail = (state: State, payload: string) => {
  localStorage.setItem('email', payload);
  state.email = payload;
};

export const setUser = (state: State, payload: User) => {
  setUserName(state, payload.userName || payload.name);
  setEmail(state, payload.email);
};

export const setEvents = (state: State, payload: Event[]) => {
  state.events = payload;
};

export const addEvent = (state: State, payload: Event) => {
  state.events.push(payload);
};

export const removeEvent = (state: State, payload: EventsLocation) => {
  state.events.splice(payload.index, 1);
};

export const uppdateEvent = (state: State, payload: EventsLocation) => {
  state.events[payload.index] = payload.event;
};

export const setToken = (state: State, payload: string) => {
  localStorage.setItem('token', payload);
  state.token = payload;
};

export const setUserWithToken = (state: State, payload: UserWithToken) => {
  setToken(state, payload.token);
  setUser(state, payload);
};
