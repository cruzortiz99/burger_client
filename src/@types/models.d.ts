import { Commit, Dispatch } from 'vuex';

export interface Context {
  state: State;
  commit: Commit;
  dispatch: Dispatch;
}

export interface State {
  userName?: string;
  email?: string;
  password?: string;
  token?: string;
  events: Event[];
}

export interface User {
  userName: string | null;
  name: string;
  email: string;
}

export interface UserWithToken extends User {
  token: string;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface EventsLocation {
  index: number;
  event: Event;
}

export interface Event {
  email: string;
  date: string;
  messages: string[];
}
