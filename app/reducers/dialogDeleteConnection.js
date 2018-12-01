// @flow

import {
  DELETE_CONNECTION_CLICK,
  DELETE_DIALOG_NO_CLICK,
  DELETE_DIALOG_YES_CLICK
} from '../actions/home';
import { Connection } from '../models/connection';

export type DialogDeleteConnectionState = {
  connection: ?Connection,
  isOpen: boolean
};

const initialState = {
  connection: null,
  isOpen: false
};

export default function dialogDeleteConnection(
  state: DialogDeleteConnectionState = initialState,
  action: Action
) {
  switch (action.type) {
    case DELETE_DIALOG_NO_CLICK:
    case DELETE_DIALOG_YES_CLICK:
      return Object.assign({}, state, { isOpen: false, connection: null });
    case DELETE_CONNECTION_CLICK:
      return Object.assign({}, state, {
        isOpen: true,
        connection: action.connection
      });
    default:
      return state;
  }
}
