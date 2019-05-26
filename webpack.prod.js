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
      SERVER: JSON.stringify('https://clerk.anikalegal.com'),
      STATIC_URL: JSON.stringify('https://repairs.anikalegal.com/static/'),
      SENTRY_JS_DSN: JSON.stringify(process.env.SENTRY_JS_DSN),
      DEBUG_JS: JSON.stringify(''),
    }),
  ],
}
