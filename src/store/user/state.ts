import { State } from 'src/@types/models';

export default function(): State {
  return {
    userName: undefined,
    email: undefined,
    token: undefined,
    events: []
  };
}
