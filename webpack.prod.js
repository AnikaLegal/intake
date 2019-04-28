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
      SERVER: JSON.stringify(process.env.READER_SERVER),
      STRIPE_KEY: JSON.stringify(process.env.STRIPE_KEY),
      SENTRY_JS_DSN: JSON.stringify(process.env.SENTRY_JS_DSN),
      G_ADS_ID: JSON.stringify(process.env.G_ADS_ID),
      DEBUG_JS: JSON.stringify(''),
    }),
  ],
}
