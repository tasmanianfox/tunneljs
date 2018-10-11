// @flow
import { DELETE_CONNECTION_CLICK } from '../actions/home';
import { Connection } from '../types/connection';

export type DialogDeleteConnectionState = {
    connection: ?Connection,
    isOpen: boolean
};

const initialState = {
    connection: null,
    isOpen: false
}

export default function dialogDeleteConnection(state: DialogDeleteConnectionState = initialState, action: Action) {
    switch (action.type) {
        case DELETE_CONNECTION_CLICK:
            return Object.assign({}, state, { isOpen: true, connection: action.connection });
        default:
            return state;
    }
}
  