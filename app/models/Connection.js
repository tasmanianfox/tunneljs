import ConnectionAuth from './ConnectionAuth';
import NetworkNode from './NetworkNode';

import Hash from '../crypto/hash';

export class Connection {
  constructor(id = null) {
    this.id = id === null ? Hash.generateRandomMd5() : id;
    this.auth = new ConnectionAuth();
    this.gate = new NetworkNode();
    this.local = new NetworkNode();
    this.name = '';
    this.target = new NetworkNode();
  }
}

export const createNewConnection = () => {
  const connection = new Connection();

  connection.name = 'New connection';

  return connection;
};

export const createSampleConnection = () => {
  const connection = new Connection();

  connection.auth.user = 'root';
  connection.name = 'Example connection';
  connection.local.host = '127.0.0.1';
  connection.local.port = 3307;
  connection.target.host = 'example.com';
  connection.target.port = 22;
  connection.gate.host = '127.0.0.1';
  connection.gate.port = 3306;

  return connection;
};

export default Connection;
