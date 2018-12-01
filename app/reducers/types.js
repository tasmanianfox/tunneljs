// @flow
import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';
import { Connection } from '../models/connection';

export type appStateType = {
  +connections: Array<Connection>
};

export type Action = {
  +type: string
};

export type GetState = () => appStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
