// @flow

export const ADD_CONNECTION = 'ADD_CONNECTION';
export const DELETE_CONNECTION_CLICK = 'DELETE_CONNECTION_CLICK';
export const EDIT_CONNECTION = 'EDIT_CONNECTION';

export const addConnection = () => ({
    type: ADD_CONNECTION
})

export const editConnection = () => ({
    type: EDIT_CONNECTION
})

export const deleteConnectionClick = connection => ({
    connection,
    type: DELETE_CONNECTION_CLICK
})