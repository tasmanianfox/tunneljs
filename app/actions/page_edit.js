export const GET_CONNECTION = 'EDIT.GET_CONNECTION';
export const AUTH_PROPERTY_UPDATED = 'EDIT.AUTH_PROPERTY_UPDATED';
export const NODE_PROPERTY_UPDATED = 'EDIT.NODE_PROPERTY_UPDATED';
export const NEXT_PAGE = 'EDIT.NEXT_PAGE';
export const PREVIOUS_PAGE = 'EDIT.PREVIOUS_PAGE';
export const SAVE_CONNECTION = 'EDIT.SAVE_CONNECTION';

export const getConnection = id => ({
  id,
  type: GET_CONNECTION
});

export const authPropertyUpdated = (propertyName, value) => ({
  propertyName,
  type: AUTH_PROPERTY_UPDATED,
  value
});

export const nodePropertyUpdated = (nodeName, propertyName, value) => ({
  nodeName,
  propertyName,
  type: NODE_PROPERTY_UPDATED,
  value
});

export const nextPage = () => ({
  type: NEXT_PAGE
});

export const previousPage = () => ({
  type: PREVIOUS_PAGE
});

export const saveConnection = connection => ({
  connection,
  type: SAVE_CONNECTION
});
