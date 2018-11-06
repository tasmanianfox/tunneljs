// @flow
import { LOCATION_CHANGE } from 'react-router-redux/reducer';
import ConnectionAuth from '../models/ConnectionAuth';
import { Connection as ConnectionType } from '../types/connection';
import {
  GET_CONNECTION,
  AUTH_PROPERTY_UPDATED,
  CONNECTION_PROPERTY_UPDATED,
  NODE_PROPERTY_UPDATED,
  NEXT_PAGE,
  PREVIOUS_PAGE
} from '../actions/page_edit';

type EditPageState = {
  connection: ?ConnectionType,
  step: integer
};

const defaultState = {
  connection: null,
  step: 0
};

const updateConnectionProperty = (state, action) => {
  const { propertyName, value } = action;

  const newState = { ...state };
  newState.connection = { ...state.connection };
  newState.connection[propertyName] = value;

  return newState;
};

const updateAuthProperty = (state, action) => {
  const { propertyName, value } = action;

  const newState = { ...state };
  newState.connection = { ...state.connection };
  newState.connection.auth = Object.assign(
    new ConnectionAuth(),
    state.connection.auth
  );
  newState.connection.auth[propertyName] = value;

  if (propertyName === 'password') {
    newState.connection.auth.privateKeyPath = null;
  } else if (propertyName === 'privateKeyPath') {
    newState.connection.auth.password = null;
  }

  return newState;
};

const updateNodeProperty = (state, action) => {
  let { value } = action;

  if (action.propertyName === 'port' && value.length > 0) {
    value = parseInt(value, 10);
    if (!value) {
      value = null;
    }
  }

  const newState = { ...state };
  newState.connection = { ...state.connection };
  newState.connection[action.nodeName] = {
    ...state.connection[action.nodeName]
  };
  newState.connection[action.nodeName][action.propertyName] = value;

  return newState;
};

export default function pageEdit(
  state: EditPageState = defaultState,
  action: Action
) {
  let newState = state;

  switch (action.type) {
    case GET_CONNECTION:
      action.connections.forEach(testConnection => {
        if (testConnection.id === action.id) {
          newState = Object.assign({}, state, { connection: testConnection });
        }
      });
      break;
    case AUTH_PROPERTY_UPDATED:
      newState = updateAuthProperty(state, action);
      break;
    case CONNECTION_PROPERTY_UPDATED:
      newState = updateConnectionProperty(state, action);
      break;
    case NODE_PROPERTY_UPDATED:
      newState = updateNodeProperty(state, action);
      break;
    case NEXT_PAGE:
      newState = Object.assign({ ...newState }, { step: newState.step + 1 });
      break;
    case PREVIOUS_PAGE:
      newState = Object.assign({ ...newState }, { step: newState.step - 1 });
      break;
    case LOCATION_CHANGE:
      newState = { ...defaultState };
      break;
    default:
      break;
  }

  return newState;
}
