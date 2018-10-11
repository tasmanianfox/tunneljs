export type Connection = {
    id: string,
    name: string,
    local: NetworkNode,
    gate: NetworkNode,
    target: NetworkNode
};

export type NetworkNode = {
    host: ?string,
    port: ?int
};