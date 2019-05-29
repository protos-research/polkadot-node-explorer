const { shield, allow } = require('graphql-shield');

module.exports = shield(
  {
    Query: {
      networkInfo: allow,
      networkSnapshots: allow,
      latestBlocks: allow,
    },
    Subscription: {
      newBlock: allow,
    }
  },
  {
    // apollo-shield automatically catches all thrown exceptions and returns an UNAUTHORIZED
    // it generats misleading errors and makes debugging very difficult, disabled for now
    // ref: https://github.com/maticzav/graphql-shield#global-fallback-error
    allowExternalErrors: true,
  },
);
