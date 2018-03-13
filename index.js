const ykit = require('ykit')

let proxy = require('http-proxy-middleware')

// Configure proxy middleware
proxy = proxy(
  {
    target: 'http://127.0.0.1:8002',
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
  cwd: process.cwd(),
  p: 8090,
  apis: {
    '/api': proxy
  }
})
