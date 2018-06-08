const ykit = require('ykit')
const fs = require('fs')
const path = require('path')
const merge = require('webpack-merge')
const { exec } = require('child_process')

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
  exec('egg-bin debug')
  console.log(`egg started on http://127.0.0.1:7001`)
}

module.exports = start
