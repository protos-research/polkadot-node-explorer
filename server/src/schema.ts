const { gql } = require('apollo-server');

const typeDefs = gql`
scalar Date
scalar DateTime

type Block {
  blockHeight: Int
  createdAt: DateTime
}

type NetworkInfo {
  chain: String
  nodeName: String
  nodeVersion: String
}

type NetworkSnapshot {
  createdAt: String
  nodes: [Node]
}

type Node {
  id: String
  ipAddress: String
  country: String
  region: String
  city: String
  latLong: [Float]
}

type Query {
  networkInfo: NetworkInfo
  networkSnapshots: [NetworkSnapshot]
}

type Subscription {
  newBlock: Block
}
`;

export default typeDefs;