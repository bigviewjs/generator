module.exports = appInfo => {
  const config = exports = {}

  config.keys = 'template'
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1520748656269_5583'

  // add your config here
  config.middleware = []
  return config
}
