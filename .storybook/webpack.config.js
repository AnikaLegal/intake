const path = require('path')
const devConfig = require('../webpack.dev.js')

module.exports = async ({ config, mode }) => {
  config.module.rules = devConfig.module.rules
  config.resolve = devConfig.resolve
  const plugins = [
    config.plugins[0],
    config.plugins[2],
    config.plugins[3],
    config.plugins[4],
    config.plugins[5],
  ].concat(devConfig.plugins)
  config.plugins = plugins
  return config
}
