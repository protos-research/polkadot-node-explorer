import { Enum } from '@polkadot/types';

declare namespace Polkadot {
  interface NodeState {
    id: string;
    ipAddress: string;
  }

  interface Node {
    id: string;
    ipAddress: string;
    isp: string;
    asHandle: string;
    country: string;
    region: string;
    city: string;
    lat: number;
    lon: number;
  }

  interface Peer {
    [id: string]: {
      knownAddresses: string[]
    };
  }

}
