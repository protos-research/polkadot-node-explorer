const geoip = require('geoip-lite');
const _ = require('lodash');

import { ApiPromise, WsProvider } from '@polkadot/api';
import logger from './logger';
import redis from './redis';
import { redisKey, config, events } from '../constants';
import pubsub from '../services/pubsub';

import NetworkState from '@polkadot/types/rpc/NetworkState';
import { ProviderInterface } from '@polkadot/rpc-provider/types';

const provider: ProviderInterface = new WsProvider(config.POLKADOT_HOST);

async function recordNetworkSnapshot() {
  logger.debug('[polkadot] recording snapshot');
  const api = await ApiPromise.create(provider);

  // ref: https://polkadot.js.org/api/METHODS_RPC.html#json-rpc
  return await api.rpc.system.networkState((state: NetworkState): void => {
    const nodes = [
      ...peersReducer(state.get('notConnectedPeers')),
      ...peersReducer(state.get('connectedPeers'))
    ];

    const networkSnapshot = {
      createdAt: new Date().toISOString(),
      nodes: nodes.map(appendGeoIP),
    };

    redis.lpush(redisKey.NETWORK_SNAPSHOTS, JSON.stringify(networkSnapshot));
    redis.ltrim(redisKey.NETWORK_SNAPSHOTS, 0, config.SNAPSHOT_LIMIT);
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
    pubsub.publish(events.BLOCK_ADDED, {
      newBlock: {
        blockHeight: parseInt(header.blockNumber.toString()),
        createdAt: new Date(),
      }
    });
    redis.set(redisKey.BLOCK_HEIGHT, header.blockNumber.toString());
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

function appendGeoIP(node: Polkadot.NodeState) {
  const location = geoip.lookup(node.ipAddress) || {};
  return {
    ...node,
    ..._.pick(location, ['country', 'region', 'city']),
    latLong: location.ll,
  };
}

export default {
  recordNetworkSnapshot,
  getNetworkInfo,
  subscribe,
};