const tunnelSsh = require('tunnel-ssh');

const Connection = require('./Connection');

class Application {
  constructor(args) {
    const { reduxStore } = args;

    this.connections = [];
    this.reduxStore = reduxStore;
  }

  setupConnection(model) {
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

    connection.tunnel = tunnelSsh({
      username: model.auth.user,
      password: model.auth.password,
      host: model.gate.host,
      port: model.gate.port || 22,
      dstHost: model.target.host,
      dstPort: model.target.port,
      localHost: model.local.host || 'localhost',
      localPort: model.local.port,
      keepAlive: true
    });
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
