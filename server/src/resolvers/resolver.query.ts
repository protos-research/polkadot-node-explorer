import PolkadotNetwork from '../models/PolkadotNetwork';

export default {
  networkInfo: async () => {
    const networkInfo = await PolkadotNetwork.getNetworkInfo();
    return networkInfo;
  },
  networkSnapshots: async () => {
    const networkSnapshots = await PolkadotNetwork.getNetworkSnapshots();
    // Note: to optimize for performance, we can always let the client parse this
    return networkSnapshots.map(JSON.parse);
  },
  latestBlocks: async () => {
    const blocks = await PolkadotNetwork.getLatestBlocks();
    return blocks.map(JSON.parse);
  },
};
