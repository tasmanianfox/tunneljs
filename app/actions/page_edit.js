export const GET_CONNECTION = 'EDIT.GET_CONNECTION';
export const NODE_PROPERTY_UPDATED = 'EDIT.NODE_PROPERTY_UPDATED';

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