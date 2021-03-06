const ykit = require('ykit')
const fs = require('fs')
const path = require('path')
const egg = require('egg')
const merge = require('webpack-merge')

let ykitConfig = require('../../config/ykit.js')

function start (args) {
  const env = args.ykitENV || 'default'
  const configPath = path.join(process.cwd(), `/config/ykit.${env}.js`)
  let config = ykitConfig
  if (fs.existsSync(configPath)) {
    const c = require(configPath)
    if (c) {
      config = merge(ykitConfig, c)
    }
  } else {
    throw new Error(`no yikit config ${configPath}`)
  }
  // start ykit server
  ykit.commands.server.run(config)

  const options = {
    port: args.eggPort,
    baseDir: args.baseDir || process.cwd(),
    workers: args.workers || 1
  }

  // start egg server
  egg.startCluster(options)
}

module.exports = start
