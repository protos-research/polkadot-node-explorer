const geoip = require('geoip-lite');
const _ = require('lodash');
const async = require('async-q');

import { ApiPromise, WsProvider } from '@polkadot/api';
import logger from './logger';
import redis from './redis';
import { redisKey, config, events } from '../constants';
import pubsub from '../services/pubsub';

import NetworkState from '@polkadot/types/rpc/NetworkState';
import { ProviderInterface } from '@polkadot/rpc-provider/types';
import { setGeoIp } from './ipApi';
import { Polkadot } from 'polkadot';


const provider: ProviderInterface = new WsProvider(config.POLKADOT_HOST);

async function recordNetworkSnapshot() {
  logger.debug('[polkadot] recording snapshot');
  const api = await ApiPromise.create(provider);

  // ref: https://polkadot.js.org/api/METHODS_RPC.html#json-rpc
  return await api.rpc.system.networkState((state: NetworkState): void => {
    const nodes: Polkadot.NodeState[] = [
      ...peersReducer(state.get('notConnectedPeers')),
      ...peersReducer(state.get('connectedPeers'))
    ];

    const networkSnapshot: Schema.NetworkSnapshot = {
      createdAt: new Date().toISOString(),
      nodeCount: nodes.length,
    };

    redis.set(redisKey.NETWORK_NODES, JSON.stringify(nodes.map(appendGeoIPLite)));
    redis.lpush(redisKey.NETWORK_SNAPSHOTS, JSON.stringify(networkSnapshot));
    redis.ltrim(redisKey.NETWORK_SNAPSHOTS, 0, config.SNAPSHOT_LIMIT);

    async.mapLimit(nodes, 2, (node: Polkadot.NodeState) => {
      return setGeoIp(node.ipAddress);
    });
  });
}

async function getNetworkInfo() {
  logger.debug('[polkadot] getting network info');
  const api = await ApiPromise.create(provider);

  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);

  logger.debug(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

  return redis.hmset(redisKey.NETWORK_INFO, {
    chain: chain.toString(),
    nodeName: nodeName.toString(),
    nodeVersion: nodeVersion.toString(),
  });
}

async function subscribe() {
  const api = await ApiPromise.create(provider);

  return await api.rpc.chain.subscribeNewHead((header) => {
    logger.debug(`[polkadot] new block added`);
    const createdAt = new Date().toISOString();

    pubsub.publish(events.BLOCK_ADDED, {
      newBlock: {
        blockHeight: parseInt(header.blockNumber.toString()),
        createdAt: new Date(),
      }
    });
    const block: Schema.Block = {
      createdAt,
      blockHeight: parseInt(header.blockNumber.toString())
    };
    redis.lpush(redisKey.LATEST_BLOCKS, JSON.stringify(block));
    redis.ltrim(redisKey.LATEST_BLOCKS, 0, config.BLOCK_HISTORY_LIMIT);
  });
}

function peersReducer(peerMap: Polkadot.Peer): Polkadot.NodeState[] {
  const peers = Object.keys(peerMap).map(id => {
    return {
      id,
      knownAddresses: peerMap[id].knownAddresses,
    };
  });

  return peers.map((peer) => {
    const nodeState: Polkadot.NodeState = {
      id: peer.id,
      ipAddress: getAddress(peer.knownAddresses),
    };
    return nodeState;
  });
}

function getAddress(addresses: string[]): string {
  const address: string = addresses.filter(address => /ip4\/[^0].*\/tcp/i.test(address))[0] || '';
  return (address.match(/ip4\/(.*)\/tcp/i) || [])[1] || '';
}

function appendGeoIPLite(node: Polkadot.NodeState) {
  const location = geoip.lookup(node.ipAddress) || {};
  const [lat, lon] = location.ll || new Array(2);
  return {
    ...node,
    ..._.pick(location, ['country', 'region', 'city']),
    lat,
    lon,
  };
}

export default {
  recordNetworkSnapshot,
  getNetworkInfo,
  subscribe,
};