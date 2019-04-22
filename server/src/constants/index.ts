export const redisKey =  {
  NETWORK_INFO: 'networkInfo',
  NETWORK_STATE: 'networkState',
  NETWORK_SNAPSHOTS: 'networkSnapshots',
  BLOCK_HEIGHT: 'blockHeight',
};

export const config = {
  SNAPSHOT_LIMIT: 1000,
  SNAPSHOT_QUERY_LIMIT: 100,
  SAMPLING_PERIOD: 30, // in minutes
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  POLKADOT_HOST: process.env.POLKADOT_HOST || 'wss://poc3-rpc.polkadot.io'
};

export const events = {
  BLOCK_ADDED: 'blockAdded',
};