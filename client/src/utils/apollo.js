import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { RestLink } from 'apollo-link-rest'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
import config from '../config'

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  }
})

const restLink = new RestLink({ uri: 'http://ip-api.com/json/' })
const httpLink = new HttpLink({uri: config.GRAPHQL_HOST})
const wsLink = new WebSocketLink({
  uri: `ws://${config.GRAPHQL_HOST.replace(/https?:\/\//gi,'')}/graphql`,
  options: {
    reconnect: true,
  },
})

// authLink should go before restLink should go before httpLink in the array,
// as httpLink will swallow any calls that should be routed through rest!
const client = new ApolloClient({
  link: ApolloLink.from([authLink, restLink, wsLink, httpLink]),
  cache: new InMemoryCache(),
})

export default client
