const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const CssExtractLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    hmr: true,
  },
}

const CssLoader = {
  loader: 'css-loader',
  options: {
    minimize: true,
  },
}

const UrlLoader = {
  loader: 'url-loader',
  options: {
    limit: 100000,
  },
}

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', CssExtractLoader, CssLoader, 'sass-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [UrlLoader],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
}
