// @flow
import { Connection } from '../types/connection';

import { GET_CONNECTION, NODE_PROPERTY_UPDATED } from '../actions/page_edit';

type EditPageState = {
  connection: ?Connection,
  step: integer
};

const defaultState = {
  connection: null,
  step: 0
};

const updateNodeProperty = (state, action) => {
  let { value } = action;

  if (action.propertyName === 'port') {
    value = parseInt(value, 10);
    if (!value) {
      value = 0;
    }
  }

  const newState = { ... state };
  newState.connection = { ... state.connection };
  newState.connection[action.nodeName] = { ... state.connection[action.nodeName] };
  newState.connection[action.nodeName][action.propertyName] = value;

  return newState;
};

export default function pageEdit(state: EditPageState = defaultState, action: Action) {
  let newState = state;

  switch (action.type) {
    case GET_CONNECTION:
      action.connections.forEach(testConnection => {
        if (testConnection.id === action.id) {
          newState = Object.assign({}, state, { connection: testConnection });
        }
      });
      break;
    case NODE_PROPERTY_UPDATED:
      newState =  updateNodeProperty(state, action);
      break;
    default:
      break;
  }

  return newState;
}
