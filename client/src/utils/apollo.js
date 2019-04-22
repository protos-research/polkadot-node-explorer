import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { RestLink } from 'apollo-link-rest'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  }
})


const restLink = new RestLink({ uri: 'http://ip-api.com/json/' })
const httpLink = createHttpLink({ uri: 'http://localhost:4000' })
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
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
