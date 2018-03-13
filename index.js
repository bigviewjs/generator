const ykit = require('ykit')

const Proxy = require('http-proxy-middleware')

const EggStarter = require('./lib/egg-starter')
const starter = new EggStarter()
// run
starter.run()

// Configure proxy middleware
const proxy = Proxy(
  {
    target: 'http://127.0.0.1:6001',
    // for vhosted sites, changes host header to match to target's host
    changeOrigin: true,
    logLevel: 'debug',
    // rewrite path
    pathRewrite: {
      '^/api/*': '/'
    }
  }
)

ykit.commands.server.run({
  cwd: process.cwd() + '/public',
  p: 8090,
  apis: {
    '/api': proxy
  }
})
