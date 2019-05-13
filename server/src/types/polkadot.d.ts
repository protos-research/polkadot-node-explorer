import { Enum } from '@polkadot/types';

declare namespace Polkadot {
  interface NodeState {
    id: string;
    ipAddress: string;
  }

  interface Node {
    id: string;
    ipAddress: string;
    country: string;
    region: string;
    city: string;
    latLong: number[];
  }

  interface Peer {
    [id: string]: {
      knownAddresses: string[]
    };
  }

}
