const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.js')

module.exports = {
  ...baseConfig,
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    disableHostCheck: true,
    publicPath: 'http://localhost:3000/build/',
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'public')],
    historyApiFallback: true,
    compress: true,
    port: 3000,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      STATIC_URL: JSON.stringify('http://localhost:3000/static/'),
      SERVER: JSON.stringify('http://localhost:8000'),
      STRIPE_KEY: JSON.stringify('pk_test_zstrxIkHKZeBtjEeY2Jkne0j'),
      SENTRY_JS_DSN: JSON.stringify(''),
      DEBUG_JS: JSON.stringify('true'),
      G_ADS_ID: JSON.stringify(''),
    }),
  ],
}
