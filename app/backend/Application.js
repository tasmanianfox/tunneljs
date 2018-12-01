const fs = require('fs');
const tunnelSsh = require('tunnel-ssh');

const Connection = require('./Connection');
const connectionAuth = require('../models/connectionAuth');

class Application {
  constructor(args) {
    const { reduxStore } = args;

    this.connections = [];
    this.reduxStore = reduxStore;
  }

  setupConnection(model) {
    const { auth } = model;
    let connection = null;

    this.connections.forEach(testConnection => {
      if (testConnection.model.id === model.id) {
        connection = testConnection;
      }
    });

    if (connection) {
      Object.assign(connection, { model });
    } else {
      connection = new Connection(model);
      this.connections.push(connection);
    }

    const config = {
      username: model.auth.user,
      host: model.gate.host,
      port: model.gate.port || 22,
      dstHost: model.target.host,
      dstPort: model.target.port,
      localHost: model.local.host || 'localhost',
      localPort: model.local.port,
      keepAlive: true
    };

    if (connectionAuth.isMethodPrivateKey(auth) === true) {
      Object.assign(config, { password: auth.password });
    } else if (connectionAuth.isMethodPrivateKey(auth) === true) {
      Object.assign(config, {
        privateKey: fs.readFileSync(model.auth.privateKeyPath),
        secret: null // needs to be implemented in config
      });
    }

    connection.tunnel = tunnelSsh(config);
  }

  terminateConnection(model) {
    let connection = null;

    this.connections.forEach(testConnection => {
      if (testConnection.model.id === model.id) {
        connection = testConnection;
      }
    });

    if (connection === null) {
      return;
    }

    connection.tunnel.close();
    this.connections = this.connections.filter(
      existingConnection => existingConnection.model.id !== model.id
    );
  }
}

module.exports = Application;
