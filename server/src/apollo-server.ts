/* eslint-disable no-console */
const { ApolloServer } = require('apollo-server');
const { applyMiddleware } = require('graphql-middleware');
const { makeExecutableSchema } = require('graphql-tools');

const context = require('./middlewares/authenticate');
const aclMiddleware = require('./middlewares/accessControl');

import resolvers from './resolvers';

import typeDefs from './schema';
const schema = makeExecutableSchema({ typeDefs, resolvers });

const isProduction: boolean = process.env.NODE_ENV === 'production';

export { default as resolvers } from './resolvers';

export { default as typeDefs } from './schema';
export const serverSchema = applyMiddleware(schema, aclMiddleware);
export const server = new ApolloServer({
  context,
  schema: serverSchema,
  introspection: !isProduction,
  playground: !isProduction,
});