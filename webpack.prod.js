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
      STATIC_URL: JSON.stringify(
        'http://anika-intake.s3-website-ap-southeast-2.amazonaws.com/static/'
      ),
      SENTRY_JS_DSN: JSON.stringify(process.env.SENTRY_JS_DSN),
      DEBUG_JS: JSON.stringify(''),
    }),
  ],
}
