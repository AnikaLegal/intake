const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const baseConfig = require('./webpack.base.js')

module.exports = {
  ...baseConfig,
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist/build',
    filename: 'main.js',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({ sourceMap: true }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      // Build system envars
      SERVER: JSON.stringify(process.env.SERVER),
      STATIC_URL: JSON.stringify(process.env.STATIC_URL),
      SENTRY_JS_DSN: JSON.stringify(process.env.SENTRY_JS_DSN),
      SENTRY_ENV: JSON.stringify(process.env.SENTRY_ENV),
      SENTRY_RELEASE: JSON.stringify(process.env.SENTRY_RELEASE),
      DEBUG_JS: JSON.stringify(''),
      SUCCESS_URL: JSON.stringify(process.env.SUCCESS_URL),
    }),
  ],
}
