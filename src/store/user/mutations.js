export const setUserName = (state, payload) => {
  state.userName = payload;
};

export const setEmail = (state, payload) => {
  localStorage.setItem("email", payload);
  state.email = payload;
};

export const setUser = (state, payload) => {
  setUserName(state, payload.userName || payload.name);
  setEmail(state, payload.email);
};

export const setEvents = (state, payload) => {
  state.events = payload;
};

export const addEvent = (state, payload) => {
  state.events.push(payload);
};

export const removeEvent = (state, payload) => {
  state.events.splice(payload.index, 1);
};

export const uppdateEvent = (state, payload) => {
  state.events[payload.index] = payload.event;
};

export const setToken = (state, payload) => {
  localStorage.setItem("token", payload);
  state.token = payload;
};

export const setUserWithToken = (state, payload) => {
  setToken(state, payload.token);
  setUser(state, payload);
};
