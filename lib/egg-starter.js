const egg = require('egg')

class Starter {
  constructor (options = {}) {
    const config = {
      port: options.eggPort || 6001,
      baseDir: options.baseDir || process.cwd(),
      workers: options.workers || 1
    }
    if (options.cluster) {
      config.cluster = options.cluster
    }

    this.config = config
    console.log(this.config)
  }

  run () {
    egg.startCluster(this.config)
  }
}

module.exports = Starter
