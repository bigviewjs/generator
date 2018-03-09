
var ykit = require("ykit")

console.log(ykit.commands.server)

var proxy = require('http-proxy-middleware');

/**
 * Configure proxy middleware
 */
var jsonPlaceholderProxy = proxy(
    {
        target: 'http://127.0.0.1:8002',
        changeOrigin: true,             // for vhosted sites, changes host header to match to target's host
        logLevel: 'debug',
        pathRewrite: {
            '^/api/*': '/',     // rewrite path
        },
    }
)

ykit.commands.server.run({
    cwd: process.cwd(),
    p: 8090,
    apis: {
        '/api': jsonPlaceholderProxy
    }
})
