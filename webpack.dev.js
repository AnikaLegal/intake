const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.js')

module.exports = {
  ...baseConfig,
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: 'http://localhost:3000/build/',
  },
  devServer: {
    disableHostCheck: true,
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'public')],
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
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
