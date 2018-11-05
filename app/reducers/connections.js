import { ADD_CONNECTION, DELETE_DIALOG_YES_CLICK } from '../actions/home';
import { SAVE_CONNECTION } from '../actions/page_edit';
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

const saveConnection = (state, connectionToSave) => {
  const newState = state.map(connection => {
    if (connection.id === connectionToSave.id) {
      return connectionToSave;
    }

    return connection;
  });

  return newState;
};

export default function connections(state: AppState = 0, action: Action) {
  switch (action.type) {
    case ADD_CONNECTION:
      return addConnection(state);
    case DELETE_DIALOG_YES_CLICK:
      return deleteConnection(state, action.connection);
    case SAVE_CONNECTION:
      return saveConnection(state, action.connection);
    default:
      return state;
  }
}
