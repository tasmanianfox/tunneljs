import { ADD_CONNECTION, DELETE_DIALOG_YES_CLICK } from '../actions/home';
import type { Action } from './types';

import { createNewConnection } from '../models/Connection';

const addConnection = state => {
  const connection = createNewConnection();

  state.push(connection);

  return Object.assign([], state);
};

const deleteConnection = (state, connectionToDelete) => {
  const filteredConnections = state.filter(
    connection => connection.id !== connectionToDelete.id
  );

  return filteredConnections;
};

export default function connections(state: AppState = 0, action: Action) {
  switch (action.type) {
    case ADD_CONNECTION:
      return addConnection(state);
    case DELETE_DIALOG_YES_CLICK:
      return deleteConnection(state, action.connection);
    default:
      return state;
  }
}
