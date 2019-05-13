const axios = require('axios');

import redis from './redis';
import { redisKey } from '../constants';
import { Polkadot } from 'polkadot';


const SERVICE_HOST = 'http://ip-api.com/json';
const MEMOIZE_STORAGE: Storage = {};

function getGeoIp(ip: string): GeoIP {
  return MEMOIZE_STORAGE[ip] || axios.get(`${SERVICE_HOST}/${ip}`).then((res: any) => res.data);
}

export async function setGeoIp(ip: string): Promise<void> {
  const geoIp = await getGeoIp(ip);
  await redis.hmset(`${redisKey.GEOIP_CACHE}:${ip}`, geoIp);
}

export async function appendGeoIp(nodes: Polkadot.Node[]): Promise<Polkadot.Node[]> {
  const commands: string[][] = nodes.map(node => ['HGETALL', `${redisKey.GEOIP_CACHE}:${node.ipAddress}`]);
  const geoIpData = await redis.batch(commands);

  return nodes.map((node, i) => {
    const geoIp = geoIpData[i];
    return {
      ...node,
      ...geoIp
    };
  });
}

interface GeoIP {
  city: string;
  region: string;
  country: string;
  countryCode: string;
  isp: string;
  lat: number;
  lon: number;
  query: string;
  status: 'success' | 'fail';
}

interface Storage {
  [ip: string]: GeoIP;
}
