const ykit = require('ykit')

const Proxy = require('http-proxy-middleware')

const EggStarter = require('../egg-starter')

function start (args) {
  // start egg
  const starter = new EggStarter(args)
  starter.run()

  // Configure proxy middleware
  const proxy = Proxy({
    target: `http://127.0.0.1:${args.port || 6001}`,
    // for vhosted sites, changes host header to match to target's host
    changeOrigin: true,
    logLevel: 'debug',
    // rewrite path
    pathRewrite: {
      '^/api/*': '/'
    }
  })

  ykit.commands.server.run({
    cwd: process.cwd() + args.publicDir || '/public',
    p: 8090,
    apis: {
      '/api': proxy
    }
  })
}

module.exports = start
