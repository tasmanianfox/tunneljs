export type Connection = {
  id: string,
  auth: ConnectionAuth,
  name: string,
  local: NetworkNode,
  gate: NetworkNode,
  target: NetworkNode
};

export type ConnectionAuth = {
  method: string,
  user: ?string,
  password: ?string,
  privateKeyPath: ?string,
  isMethodPassword: () => boolean,
  isMethodPrivateKey: () => boolean
};

export type NetworkNode = {
  host: ?string,
  port: ?int
};
