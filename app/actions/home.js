// @flow

export const ADD_CONNECTION = 'ADD_CONNECTION';
export const DELETE_CONNECTION_CLICK = 'DELETE_CONNECTION_CLICK';
export const DELETE_DIALOG_YES_CLICK = 'DELETE_DIALOG_YES_CLICK';
export const DELETE_DIALOG_NO_CLICK = 'DELETE_DIALOG_NO_CLICK';
export const EDIT_CONNECTION = 'EDIT_CONNECTION';
export const SSH_CONNECTION_ESTABILISHED = 'SSH_CONNECTION_ESTABILISHED';

export const addConnection = () => ({
  type: ADD_CONNECTION
});

export const editConnection = () => ({
  type: EDIT_CONNECTION
});

export const deleteConnectionClick = connection => ({
  connection,
  type: DELETE_CONNECTION_CLICK
});

export const onDeleteDialogYesClick = connection => ({
  connection,
  type: DELETE_DIALOG_YES_CLICK
});

export const onDeleteDialogNoClick = connection => ({
  connection,
  type: DELETE_DIALOG_NO_CLICK
});

export const sshConnectionEstabilished = connection => ({
  connection,
  type: SSH_CONNECTION_ESTABILISHED
});
