export interface State {
  version: string;
}

export default function(): State {
  return {
    version: '0.0.1'
  };
}
