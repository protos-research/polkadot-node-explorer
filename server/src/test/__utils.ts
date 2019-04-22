
const { ApolloServer } = require('apollo-server');
import { serverSchema } from '../apollo-server';

export function constructTestServer({ context = {} } = {}) {
  const server = new ApolloServer({
    mocks: false,
    context,
    schema: serverSchema,
    introspection: false,
    playground: false,
  });

  return { server };
}