// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import connections from './connections';
import dialogDeleteConnection from './dialogDeleteConnection';

const rootReducer = combineReducers({
  connections,
  dialogDeleteConnection,
  router
});

export default rootReducer;
