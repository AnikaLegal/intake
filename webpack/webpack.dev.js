const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.base.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const rules = require('./rules.js')

module.exports = {
  ...base,
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: 'http://localhost:3000/build/',
  },
  module: { rules: rules.dev },
  devServer: {
    disableHostCheck: true,
    contentBase: [
      path.join(__dirname, '../dist'),
      path.join(__dirname, '../public'),
    ],
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      SERVER: JSON.stringify('http://localhost:8000'),
      STATIC_URL: JSON.stringify('http://localhost:3000/static/'),
      SENTRY_JS_DSN: JSON.stringify(''),
      SENTRY_RELEASE: JSON.stringify(''),
      DEBUG_JS: JSON.stringify('true'),
      GA_ID: JSON.stringify(process.env.GA_ID),
    }),
  ],
}
