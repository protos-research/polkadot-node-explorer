import redis from '../services/redis';
import { redisKey, config } from '../constants';

async function getNetworkInfo() {
  return redis.hgetall(redisKey.NETWORK_INFO);
}

async function getNetworkSnapshots() {
  return redis.lrange(redisKey.NETWORK_SNAPSHOTS, 0, config.SNAPSHOT_QUERY_LIMIT);
}

async function getLatestBlocks() {
  return redis.lrange(redisKey.LATEST_BLOCKS, 0, config.BLOCK_HISTORY_LIMIT);
}

export default {
  getNetworkInfo,
  getNetworkSnapshots,
  getLatestBlocks
};