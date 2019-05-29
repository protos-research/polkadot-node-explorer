const gql = require('graphql-tag');
const { createTestClient } = require('apollo-server-testing');

import { WebSocketLink } from 'apollo-link-ws';
import ApolloClient from 'apollo-client';
import { Server, WebSocket } from 'mock-socket-with-protocol';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { events } from '../constants';

import { serverSchema } from '../apollo-server';
import redis from '../services/redis';
import { constructTestServer } from './__utils';
import pubsub from '../services/pubsub';

import Polkadot from '../types/polkadot';

describe('graphQL', function() {
  beforeAll(async () => {

    const { server } = constructTestServer({
      context: () => ({}),
    });
    const client = createTestClient(server);
    this.query = client.query;
  });

  // --- Queries --- //

  describe('Queries', () => {
    it('networkInfo', async () => {
      const networkInfo = {
        'chain': 'Alexander',
        'nodeName': 'parity-polkadot',
        'nodeVersion': '0.4.0',
      };
      const nodes = [{ipAddress: '0.0.0.0'}];
      const nodesWithGeoIp = [
        {ipAddress: '0.0.0.0', lat: 49.24892, lon: -123.1502117}
      ];
      redis.hgetall = jest.fn(() => networkInfo);
      redis.get = jest.fn(() => JSON.stringify(nodes));
      redis.batchExec = jest.fn(function() {
        return new Promise((resolve, reject) => resolve(nodesWithGeoIp));
      });

      const query = gql`
        query {
          networkInfo {
            chain
  	        nodeVersion
 		        nodeName
            nodes {
              ipAddress
              lat
              lon
            }
          }
        }
      `;
      const res = await this.query({ query });
      res.errors && console.error(JSON.stringify(res.errors, undefined, 2));
      if (res.errors) throw res.errors;
      expect({
        ...res.data.networkInfo
      }).toEqual({
        ...networkInfo,
        nodes: nodesWithGeoIp,
      });
    });

    it('networkSnapshots', async () => {
      const snapshot = {
        createdAt: new Date().toISOString(),
        nodeCount: 1
      };
      const networkSnapshots = [
        JSON.stringify(snapshot)
      ];
      redis.lrange = jest.fn(() => networkSnapshots);
      const query = gql`
        query {
          networkSnapshots {
            createdAt
            nodeCount
          }
        }
      `;
      const res = await this.query({ query });
      if (res.errors) throw res.errors;
      expect(res.data.networkSnapshots).toEqual([snapshot]);
    });

    it('latestBlocks', async () => {
      const block = {
        createdAt: new Date().toISOString(),
        blockHeight: 9001,
      };
      const latestBlocks = [
        JSON.stringify(block)
      ];
      redis.lrange = jest.fn(() => latestBlocks);
      const query = gql`
        query {
          latestBlocks {
            createdAt
            blockHeight
          }
        }
      `;
      const res = await this.query({ query });
      if (res.errors) throw res.errors;
      expect(res.data.latestBlocks).toEqual([block]);
    });
  });


  // --- Subscriptions --- //

  describe('Subscription', () => {
    it('newBlock', (done) => {
      const testData = {
        newBlock: {
          blockHeight: 1,
          createdAt: new Date(),
        }
      };

      gqClient()
      .subscribe({
        query: gql`
          subscription {
            newBlock {
              blockHeight
              createdAt
            }
          }
        `
      })
      .subscribe({
        next({ data }) {
          expect(data.newBlock.blockHeight).toEqual(testData.newBlock.blockHeight);
          done();
        }
      });

      setTimeout(() => {
        pubsub.publish(events.BLOCK_ADDED, testData);
      }, 50);
    });
  });
});


// ref: https://github.com/apollographql/subscriptions-transport-ws/blob/master/docs/source/integration-testing.md
const gqClient = () => {
    // To make the point clear that we are not opening any ports here we use a randomized string that will not produce a correct port number.
    // This example of WebSocket client/server uses string matching to know to what server connect a given client.
    // We are randomizing because we should use different string for every test to not share state.
    const RANDOM_WS_PORT = Math.floor(Math.random() * 100000);
    const customServer = new Server(`ws://localhost:${RANDOM_WS_PORT}`);

    // We pass customServer instead of typical configuration of a default WebSocket server
    SubscriptionServer.create(
      {
        schema: serverSchema,
        execute,
        subscribe
      },
      customServer
    );

    // The uri of the WebSocketLink has to match the customServer uri.
    const wsLink = new WebSocketLink({
      uri: `ws://localhost:${RANDOM_WS_PORT}`,
      webSocketImpl: WebSocket
    });

    // Nothing new here
    return new ApolloClient({
      link: wsLink,
      cache: new InMemoryCache(),
    });
  };