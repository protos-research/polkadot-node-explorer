import PolkadotNetwork from '../models/PolkadotNetwork';
import { appendGeoIp } from '../services/ipApi';

export default {
  networkInfo: async () => {
    const networkInfo = await PolkadotNetwork.getNetworkInfo();
    const nodes = await PolkadotNetwork.getNetworkNodes();
    const nodesWithGeoIp = await appendGeoIp(nodes);

    return {...networkInfo, nodes: nodesWithGeoIp};
  },
  networkSnapshots: async () => {
    return await PolkadotNetwork.getNetworkSnapshots();
  },
  latestBlocks: async () => {
    return await PolkadotNetwork.getLatestBlocks();
  },
};
