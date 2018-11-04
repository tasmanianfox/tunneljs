const AUTH_METHOD_PASSWORD = 'password';
const AUTH_METHOD_PRIVATE_KEY = 'private_key';

class ConnectionAuth {
  constructor() {
    this.method = AUTH_METHOD_PASSWORD;
    this.password = null;
    this.privateKeyPath = null;
    this.user = null;
  }

  isMethodPassword() {
    return this.method === AUTH_METHOD_PASSWORD;
  }

  isMethodPrivateKey() {
    return this.method === AUTH_METHOD_PRIVATE_KEY;
  }
}

export default ConnectionAuth;
