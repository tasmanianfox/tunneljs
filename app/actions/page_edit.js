export const GET_CONNECTION = 'EDIT.GET_CONNECTION';
export const NODE_PROPERTY_UPDATED = 'EDIT.NODE_PROPERTY_UPDATED';
export const NEXT_PAGE = 'EDIT.NEXT_PAGE';
export const PREVIOUS_PAGE = 'EDIT.PREVIOUS_PAGE';

export const getConnection = id => ({
    id,
    type: GET_CONNECTION
})

export const connectionPropertyUpdated = (nodeName, propertyName, value) => ({
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