// ref: https://github.com/NodeRedis/node_redis#options-object-properties
const redis = require('redis');
const { promisify } = require('util');
import { config } from '../constants';

const client = redis.createClient({
  host: config.REDIS_HOST
});

export default {
  client,
  lpush: promisify(client.lpush).bind(client),
  lrange: promisify(client.lrange).bind(client),
  ltrim: promisify(client.ltrim).bind(client),
  set: promisify(client.set).bind(client),
  get: promisify(client.get).bind(client),
  hmset: promisify(client.hmset).bind(client),
  hgetall: promisify(client.hgetall).bind(client),
  batch: promisify(client.batch).bind(client),
};