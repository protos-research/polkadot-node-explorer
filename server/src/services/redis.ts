// ref: https://github.com/NodeRedis/node_redis#options-object-properties
const redis = require('redis');
const { promisify } = require('util');
import { config } from '../constants';

const client = redis.createClient({
  host: config.REDIS_HOST
});

function batchExec<T>(commands: string[][]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    return client.batch(commands).exec((err: Error, replies: T[]) => {
      if (err) reject(err);
      else resolve(replies);
    });
  });
}

export default {
  client,
  lpush: promisify(client.lpush).bind(client),
  lrange: promisify(client.lrange).bind(client),
  ltrim: promisify(client.ltrim).bind(client),
  set: promisify(client.set).bind(client),
  get: promisify(client.get).bind(client),
  hmset: promisify(client.hmset).bind(client),
  hgetall: promisify(client.hgetall).bind(client),
  batchExec,
};