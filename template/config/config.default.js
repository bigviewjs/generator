'use strict'

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = '<% keys %>'

  // add your config here
  config.middleware = []

  config.proxy = {
    // target host that matched path will be proxy to
    host: `http://127.0.0.1:8000`,
    // path pattern
    match: 'public'
  }
  return config
}
