// @flow
import { Connection } from '../types/connection';

import { GET_CONNECTION } from '../actions/page_edit';

type EditPageState = {
  connection: ?Connection,
  step: integer
};

const defaultState = {
  connection: null,
  step: 0
};

export default function pageEdit(state: EditPageState = defaultState, action: Action) {
  let newState = state;

  switch (action.type) {
    case GET_CONNECTION:
      
      action.connections.forEach(testConnection => {
        if (testConnection.id === action.id) {
          newState = Object.assign({}, state, { connection: testConnection, 'a': 'b' });
        }
      });
      break;
    default:
      break;
  }

  return newState;
}
