// @flow
import Hash from '../crypto/hash';
import { AUTH_METHOD_PASSWORD } from './connectionAuth';

export type Connection = {
  id: string,
  auth: ConnectionAuth,
  name: string,
  local: NetworkNode,
  gate: NetworkNode,
  target: NetworkNode
};

const template = {
  auth: {
    method: AUTH_METHOD_PASSWORD,
    user: null,
    password: null,
    privateKeyPath: null
  },
  gate: {
    host: null,
    port: null
  },
  local: {
    host: null,
    port: null
  },
  name: null,
  target: {
    host: null,
    port: null
  }
};

export const createNewConnection = () => {
  const connection = Object.assign({}, template, {
    id: Hash.generateRandomMd5(),
    name: 'New connection'
  });

  return connection;
};

export const createSampleConnection = () => {
  const connection = Object.assign(createNewConnection(), {
    auth: {
      user: 'root'
    },
    gate: {
      host: '127.0.0.1',
      port: 3306
    },
    local: {
      host: '127.0.0.1',
      port: 3307
    },
    name: 'Example connection',
    target: {
      host: 'example.com',
      port: 22
    }
  });

  return connection;
};
