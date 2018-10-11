import md5 from 'md5';
import { ADD_CONNECTION } from '../actions/home';
import type { Action } from './types';

const connectionTemplate = {
  id: '',
  name: 'New connection',
  auth: {
      user: 'root'
  },
  local: {
      host: '127.0.0.1',
      port: 3307
  },
  gate: {
      host: 'example.com',
      port: 22
  },
  target: {
      host: '127.0.0.1',
      port: 3306
  }
};

// [min, max)
const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

const addConnection = state => {
  const random = getRandomArbitrary(0, 100);
  const time = new Date().getTime();
  const id = md5(`${time}_${random}`);
  const connection = { ... connectionTemplate, id };

  state.push(connection);

  return Object.assign([], state);
};

export default function connections(state: AppState = 0, action: Action) {
  switch (action.type) {
    case ADD_CONNECTION:
      return addConnection(state);
    default:
      return state;
  }
}
