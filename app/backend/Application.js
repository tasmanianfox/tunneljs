const fs = require('fs');
const openSshTunnel = require('open-ssh-tunnel');

const Connection = require('./Connection');
const connectionAuth = require('../models/connectionAuth');

class Application {
  constructor(args) {
    const { reduxStore } = args;

    this.connections = [];
    this.reduxStore = reduxStore;
  }

  async setupConnection(model) {
    const { auth } = model;
    let connection = null;
    let isNewConnection = false;

    this.connections.forEach(testConnection => {
      if (testConnection.model.id === model.id) {
        connection = testConnection;
      }
    });

    if (connection) {
      Object.assign(connection, { model });
    } else {
      connection = new Connection(model);
      isNewConnection = true;
    }

    const config = {
      host: model.gate.host,
      port: model.gate.port,
      username: model.auth.user,
      srcPort: model.target.port,
      srcAddr: model.target.host,
      dstPort: model.target.port,
      dstAddr: model.target.host,
      readyTimeout: 20000,
      forwardTimeout: 20000,
      localPort: model.local.port,
      localAddr: model.local.host
    };

    if (connectionAuth.isMethodPassword(auth) === true) {
      Object.assign(config, { password: auth.password });
    } else if (connectionAuth.isMethodPrivateKey(auth) === true) {
      Object.assign(config, {
        privateKey: fs.readFileSync(model.auth.privateKeyPath)
      });
    }

    const tunnel = await openSshTunnel(config);
    connection.tunnel = tunnel;

    if (isNewConnection) {
      this.connections.push(connection);
    }
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
