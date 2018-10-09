import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type NetworkNode = {
  host: ?string,
  port: ?int
};

export type Connection = {
  id: string,
  name: string,
  local: NetworkNode,
  gate: NetworkNode,
  target: NetworkNode
};

export type appStateType = {
  +connections: Array<Connection>
};

export type Action = {
  +type: string
};

export type GetState = () => appStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
