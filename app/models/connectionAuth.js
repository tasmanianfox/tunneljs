export const AUTH_METHOD_PASSWORD = 'password';
export const AUTH_METHOD_PRIVATE_KEY = 'private_key';

export type ConnectionAuth = {
  method: string,
  user: ?string,
  password: ?string,
  privateKeyPath: ?string
};

export const isMethodPassword = (self: ConnectionAuth) =>
  self.method === AUTH_METHOD_PASSWORD;
export const isMethodPrivateKey = (self: ConnectionAuth) =>
  self.method === AUTH_METHOD_PRIVATE_KEY;
