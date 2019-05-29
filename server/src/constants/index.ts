export const redisKey =  {
  NETWORK_INFO: 'networkInfo',
  NETWORK_STATE: 'networkState',
  NETWORK_NODES: 'networkNodes',
  NETWORK_SNAPSHOTS: 'networkSnapshots',
  LATEST_BLOCKS: 'latestBlocks',
  GEOIP_CACHE: 'geoIpCache',
};

export const config = {
  SNAPSHOT_LIMIT: 1000,
  SNAPSHOT_QUERY_LIMIT: 100,
  SAMPLING_PERIOD: 60 * 3, // in minutes
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  POLKADOT_HOST: process.env.POLKADOT_HOST || 'wss://poc3-rpc.polkadot.io',
  BLOCK_HISTORY_LIMIT: 10,
};

export const events = {
  BLOCK_ADDED: 'blockAdded',
};