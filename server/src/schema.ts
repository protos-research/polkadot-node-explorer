const { gql } = require('apollo-server');

const typeDefs = gql`
scalar Date
scalar DateTime

type Block {
  blockHeight: Int
  createdAt: DateTime
  parentHash: String
}

type NetworkInfo {
  chain: String
  nodeName: String
  nodeVersion: String
  nodes: [Node]
}

type NetworkSnapshot {
  createdAt: String
  nodeCount: Int
}

type Node {
  id: String
  ipAddress: String
  isp: String
  asHandle: String
  country: String
  region: String
  city: String
  lat: Float
  lon: Float
}

type Query {
  networkInfo: NetworkInfo
  networkSnapshots: [NetworkSnapshot]
  latestBlocks: [Block]
}

type Subscription {
  newBlock: Block
}
`;

export default typeDefs;