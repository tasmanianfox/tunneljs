// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import connections from './connections';

const rootReducer = combineReducers({
  connections,
  router
});

export default rootReducer;
