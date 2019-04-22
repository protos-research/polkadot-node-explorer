import gql from 'graphql-tag'

const GET_NETWORK_SNAPSHOTS = gql`
  {
    networkSnapshots {
      createdAt
      nodes {
        id
        ipAddress
        country
        region
        city
        latLong
      }
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
    }
  }
`

export default {
  GET_NETWORK_SNAPSHOTS,
  GET_IP_DETAILS,
  BLOCK_SUBSCRIPTION,
}
