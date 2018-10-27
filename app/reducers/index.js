// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import connections from './connections';
import dialogDeleteConnection from './dialogDeleteConnection';
import pageEdit from './pageEdit';
import { GET_CONNECTION } from '../actions/page_edit';

const rootReducer = combineReducers({
  connections,
  dialogDeleteConnection,
  pageEdit,
  router
});

const reducer = (state, action) => {
  let newAction = action;

  switch (action.type) {
    case GET_CONNECTION:
      newAction = Object.assign({}, action, {
        connections: state.connections
      });
      break;
    default:
      break;
  }

  return rootReducer(state, newAction);
};



export default reducer;
