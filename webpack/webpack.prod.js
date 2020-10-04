const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const rules = require('./rules.js')
const base = require('./webpack.base.js')

module.exports = {
  ...base,
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../dist/build'),
    filename: '[name].js',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({ sourceMap: true }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  module: { rules: rules.prod },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      // Build system envars
      SERVER: JSON.stringify(process.env.SERVER),
      STATIC_URL: JSON.stringify(process.env.STATIC_URL),
      SENTRY_JS_DSN: JSON.stringify(process.env.SENTRY_JS_DSN),
      SENTRY_ENV: JSON.stringify(process.env.SENTRY_ENV),
      SENTRY_RELEASE: JSON.stringify(process.env.SENTRY_RELEASE),
      DEBUG_JS: JSON.stringify(''),
      GA_ID: JSON.stringify(process.env.GA_ID),
    }),
  ],
}
