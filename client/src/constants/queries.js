import gql from 'graphql-tag'

const GET_NETWORK_INFO = gql`
  {
    networkInfo {
      chain
      nodeName
      nodeVersion
      nodes {
        id
        ipAddress
        isp
        asHandle
        country
        region
        city
        lat
        lon
      }
    }
  }
`

const GET_NETWORK_SNAPSHOTS = gql`
  {
    networkSnapshots {
      createdAt
      nodeCount
    }
  }
`

const GET_LATEST_BLOCKS = gql`
  {
    latestBlocks {
      createdAt
      blockHeight
      parentHash
    }
  }
`

const GET_IP_DETAILS = gql`
  query ipInfo($ipAddress: String!) {
    ipInfo(ipAddress: $ipAddress)
      @rest(type: "IpInfo", path: "{args.ipAddress}") {
      as
      city
      country
      isp
      query
      status
    }
  }
`

const BLOCK_SUBSCRIPTION = gql`
  subscription onBlockAdded {
    newBlock {
      blockHeight
      createdAt
      parentHash
    }
  }
`

export default {
  GET_NETWORK_INFO,
  GET_NETWORK_SNAPSHOTS,
  GET_LATEST_BLOCKS,
  GET_IP_DETAILS,
  BLOCK_SUBSCRIPTION,
}
