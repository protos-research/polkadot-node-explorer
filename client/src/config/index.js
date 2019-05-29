let config

switch (process.env.NODE_ENV) {
  case 'production':
    config = require('./production')
    break
  case 'development':
    config = require('./development')
    break
  default:
    config = {}
}

export default {
  ...config,
}
