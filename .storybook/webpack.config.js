const path = require('path')
const webpack = require('webpack')
const base = require('../webpack/webpack.base.js')
const rules = require('../webpack/rules.js')

module.exports = async ({ config, mode }) => {
  config.module.rules = [rules.prod[0], rules.dev[1], rules.dev[2]]
  config.resolve = base.resolve
  config.plugins.push(
    new webpack.DefinePlugin({
      SERVER: JSON.stringify('http://localhost:8000'),
      STATIC_URL: JSON.stringify('http://localhost:3000/static/'),
      SENTRY_JS_DSN: JSON.stringify(''),
      SENTRY_RELEASE: JSON.stringify(''),
      DEBUG_JS: JSON.stringify('true'),
      GA_ID: JSON.stringify(process.env.GA_ID),
    })
  )
  return config
}
