// @flow
import {
  ADD_CONNECTION,
  DELETE_DIALOG_YES_CLICK,
  SSH_CONNECTION_ERROR,
  SSH_CONNECTION_ESTABILISHED,
  SSH_CONNECTION_TERMINATED
} from '../actions/home';
import { SAVE_CONNECTION } from '../actions/page_edit';
import type { Action } from './types';

import { createNewConnection } from '../models/connection';

const config = require('../config');

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

  config.setConnections(newState);
  config.saveConfig();

  return newState;
};

const switchConnection = (state, enabledConnection, isActive) => {
  let newState = Object.assign([], state);

  newState = newState.map(connection => {
    if (connection.id === enabledConnection.id) {
      Object.assign(connection, { isActive, error: null });
    }

    return connection;
  });

  return newState;
};

const setConnectionError = (state, errorConnection, errorMessage) => {
  let newState = Object.assign([], state);

  newState = state.map(connection => {
    if (connection.id === errorConnection.id) {
      Object.assign(connection, { error: errorMessage, isActive: false });
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
    case SSH_CONNECTION_ERROR:
      return setConnectionError(state, action.connection, action.errorMessage);
    case SSH_CONNECTION_ESTABILISHED:
      return switchConnection(state, action.connection, true);
    case SSH_CONNECTION_TERMINATED:
      return switchConnection(state, action.connection, false);
    default:
      return state;
  }
}
