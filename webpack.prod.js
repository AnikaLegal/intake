const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const baseConfig = require('./webpack.base.js')

module.exports = {
  ...baseConfig,
  mode: 'production',
  output: {
    path: __dirname + '/dist/build',
    filename: 'main.js',
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      // Build system envars
      SERVER: JSON.stringify(process.env.SERVER),
      STATIC_URL: JSON.stringify(process.env.STATIC_URL),
      SENTRY_JS_DSN: JSON.stringify(process.env.SENTRY_JS_DSN),
      SENTRY_ENV: JSON.stringify(process.env.SENTRY_ENV),
      DEBUG_JS: JSON.stringify(''),
    }),
  ],
}
