declare namespace Polkadot {
  interface NodeState {
    id: string;
    ipAddress: string;
  }
  interface Peer {
    [id: string]: {
      knownAddresses: string[]
    };
  }
}