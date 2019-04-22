const { GraphQLDate, GraphQLDateTime } = require('graphql-iso-date');

import Query from './resolver.query';
import Subscription from './resolver.subscription';

// ref: https://www.apollographql.com/docs/graphql-tools/scalars.html#Using-a-package
export default {
  Query,
  Subscription,
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
};
