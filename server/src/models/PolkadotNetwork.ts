import redis from '../services/redis';
import { redisKey, config } from '../constants';
import { Polkadot } from 'polkadot';

async function getNetworkInfo(): Promise<Schema.NetworkInfo> {
  return redis.hgetall(redisKey.NETWORK_INFO);
}

async function getNetworkNodes(): Promise<Polkadot.Node[]> {
  const nodes = await redis.get(redisKey.NETWORK_NODES);
  return nodes ? JSON.parse(nodes) : [];
}

async function getNetworkSnapshots(limit: number = config.SNAPSHOT_QUERY_LIMIT): Promise<Schema.NetworkSnapshot[]> {
  const results = await redis.lrange(redisKey.NETWORK_SNAPSHOTS, 0, limit);
  return results ? results.map(JSON.parse) : [];
}

async function getLatestBlocks(): Promise<Schema.Block[]> {
  const results = await redis.lrange(redisKey.LATEST_BLOCKS, 0, config.BLOCK_HISTORY_LIMIT);
  return results ? results.map(JSON.parse) : [];
}

export default {
  getNetworkInfo,
  getNetworkNodes,
  getNetworkSnapshots,
  getLatestBlocks
};