const egg = require('egg')

class Starter {
  constructor (options = {}) {
    this.config = {
      port: options.port || 6001,
      baseDir: options.baseDir || process.cwd(),
      cluster: options.cluster || 1
    }
    console.log(this.config)
  }

  run () {
    egg.startCluster(this.config)
  }
}

module.exports = Starter
