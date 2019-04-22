const { AuthenticationError } = require('apollo-server');

module.exports = async function getContext(ctx: Apollo.Context) {
  const context = { request: ctx.req };

  return context;
};
